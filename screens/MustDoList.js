import { View, Text, StyleSheet, Alert, Image, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { auth } from "../firebase/FirebaseSetup";
import TextButton from "../components/TextButton";
import { deleteSelectionsFromUsersDB } from "../firebase/FirebaseHelper";
import { FlatList } from "react-native-gesture-handler";
import { bookmarksCollectionRef } from "../firebase/FirebaseSetup";
import EntryButtonTextHelper from "../helper/EntryButtonTextHelper";
import { onAuthStateChanged } from "firebase/auth";
import NotificationReminder from "../components/NotificationReminder";
import DateTimePickerManager from "../components/DateTimePickerManager";
import createLocalNotification from "../helper/CreateLocalNotification";
import IconButton from "../components/IconButton";

export default function MustDoList({ navigation, route }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [generatedMustDoList, setGeneratedMustDoList] = useState([]); 
  const [bookmarkList, setBookmarkList] = useState([]); 
  const [randomImageUrl, setRandomImageUrl] = useState("");
  const [dateTime, setDateTime] = useState(new Date()); // default date and time is now
  const [modalVisible, setModalVisible] = useState(false); 
  const [dateTimePickerVisible, setDateTimePickerVisible] = useState(false); // show the date and time picker
  const [dateTimePickerMode, setDateTimePickerMode] = useState("date"); // show the date and time picker
  const [reminderTitle, setReminderTitle] = useState("");
  const [reminderBody, setReminderBody] = useState("");
  const [reminderData, setReminderData] = useState(null);

  const callDatePicker = () => {
    setDateTimePickerMode("date")
    setDateTimePickerVisible(true)
  }

  const callTimePicker = () => {
    setDateTimePickerMode("time")
    setDateTimePickerVisible(true)
  }

  const cancelSettingReminderHandler = () => {
    setDateTimePickerVisible(false)
    setModalVisible(false)
  }

  const confirmSettingReminderHandler = () => {
    createLocalNotification(dateTime, reminderTitle, reminderBody, reminderData)
    setDateTimePickerVisible(false)
    setModalVisible(false)
  }

  const passDateTime = (currentDate) => {
    setDateTime(currentDate)
  }

  const createReminderHandler = (item) => {
    const title = EntryButtonTextHelper(item)
    setReminderTitle(title)
    setReminderBody("Tap to know how to" + title)
    setReminderData(null)
    setModalVisible(true)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // a valid user is logged in
        setIsLoggedIn(true);
      } else {
        //before authentication or after logout
        setIsLoggedIn(false);
      }
    });
  }, [auth.currentUser]);

  useEffect(() => {
    // if a user is logged in, fetch the data from the database
    if (isLoggedIn) {
      const bookmarkDocRef = doc(bookmarksCollectionRef, auth.currentUser.uid);

      const unsubscribe = onSnapshot(bookmarkDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          console.log("Received generatedMustDoList from database: ", docSnapshot.data().generatedMustDoList);
          setGeneratedMustDoList(docSnapshot.data().generatedMustDoList); 
          setBookmarkList(docSnapshot.data().bookmarkList); 
        }
      });

      return () => unsubscribe();

    } else {
      // if no user is logged in, set generatedMustDoList to the passed in data if any
      if (route.params?.generatedMustDoList) {
        console.log("Received generatedMustDoList from local: ", route.params.generatedMustDoList)
        setGeneratedMustDoList(route.params.generatedMustDoList);
      }
    }
  }, [isLoggedIn, auth.currentUser]); // Empty dependency array means this effect runs once after the component mounts

  const finishDeletionAlert = () => (
    Alert.alert(
      "Data Cleared",
      "Your selections has been successfully cleared.",
      [
        {
          text: "Home",
          onPress: () => navigation.replace("Home", {
            screen: "Explore",
            params: null
          }),
        },
      ]
    )
  )

  const clearData = async () => {
    try {
      await deleteSelectionsFromUsersDB();
      finishDeletionAlert();
    } catch (err) {
      console.error("Error clearing data: ", err);
      Alert.alert("Error", "Failed to clear data.");
    }
  }

  const handleClearSelections = () => {
      if(isLoggedIn){
        Alert.alert(
          "Notice",
          "Confirm to clear? This will also wipe out your current Must-Do List.",
          [
            {
              text: "Cancel"
            },
            {
              text: "Confirm",
              onPress: clearData
            }]
        )
      } else {
        finishDeletionAlert()
      }
  };

  const handleChangeAnswers = () => {
    if(isLoggedIn){
      navigation.navigate("MustDo");
    } else {
      if(route.params?.userSelection){
        navigation.navigate("MustDo", {userSelection: route.params.userSelection});
    }
  };
}

  const handleExplore = () => {
    if(isLoggedIn){
      navigation.navigate("Home");
    } else {
        navigation.navigate("Home", {
          screen: "Explore", 
          params: {
            generatedMustDoList : generatedMustDoList, 
            userSelection: route.params?.userSelection
          }})
      }
  };

  const getPhotosFromApi = async () => {
    try {
      const response = await fetch(
        "https://api.unsplash.com/search/photos?page=1&query=canada&client_id=ofLsQSlHqTNFJoH1gx4zZqvib0gjNT6Q5EGozXNsJ_I"
      );
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Call the API inside the useEffect to make sure it's awaited
        const jsonData = await getPhotosFromApi();

        // Check if jsonData has results
        if (jsonData && jsonData.results.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * jsonData.results.length
          );
          const randomPhoto = jsonData.results[randomIndex];
          setRandomImageUrl(randomPhoto.urls.regular);
        } else {
          console.log("No results found");
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []); // The empty dependency array ensures this effect runs once after the initial render

  const goToDetails = (topic) => {
    navigation.navigate("Details", { topic: topic });
  };

  return (
    <View>
      {/*Modal for setting reminder by dateTime*/}
        <Modal
          transparent={true}
          animationType="fade"
          visible={modalVisible}
        >
          <View style={mustDoListStyles.modal}>
          <View style={mustDoListStyles.reminderSettingBanner}>
            <Text>Create Your Reminder</Text>
            <View style={mustDoListStyles.reminderSettingButtonRow}>
              <TextButton onPress={callDatePicker}>
                <Text>Set Date</Text>
              </TextButton>

              <TextButton onPress={callTimePicker}>
                <Text>Set Time</Text>
              </TextButton>
            </View>
            
            {dateTimePickerVisible && (
              <DateTimePickerManager 
                currentMode={dateTimePickerMode}
                dateTime={dateTime}
                passDateTime={passDateTime}
                />
            )}

            <Text>Do you want to set a reminder at</Text>
            <Text>{dateTime.toLocaleString()}</Text>

            <View style={mustDoListStyles.reminderSettingButtonRow}>
              <TextButton onPress={cancelSettingReminderHandler}>
                <Text>Cancel</Text>
              </TextButton>

              <TextButton onPress={confirmSettingReminderHandler}>
                <Text>Confirm</Text>
              </TextButton>
            </View>
          </View>
          </View>
        </Modal>

      {/*Screen*/}
      {randomImageUrl ? (
        <Image
          source={{ uri: randomImageUrl }}
          style={{ width: "100%", height: "50%" }}
          resizeMode="cover"
        />
      ) : null}

      <FlatList
        data={generatedMustDoList}
        renderItem={({ item, index }) => {
          if (item === "nothing") {
            return (
              <Text>
                {"Great news!\nYou've covered all the essential tasks based on the information provided."}
              </Text>);
          } else {
            return (
            <View style={mustDoListStyles.toDoTask}>
              <TextButton onPress={() => goToDetails(item)}>
                <Text>
                  {EntryButtonTextHelper(item)}
                </Text>
              </TextButton>
              <IconButton
                  onPress={(item) => createReminderHandler(item)}
                  type="reminder"
                />
            </View>)
          }
        }}
        />

      <TextButton onPress={handleClearSelections}>
        <Text style={mustDoListStyles.clearDataButtonText}>Clear All My Selections</Text>
      </TextButton>
      <TextButton onPress={handleChangeAnswers}>
        <Text style={mustDoListStyles.clearDataButtonText}>Update My Answers</Text>
      </TextButton>
      <TextButton onPress={handleExplore}>
        <Text style={mustDoListStyles.clearDataButtonText}>Ready To Explore</Text>
      </TextButton>
    </View>
  );
}

const mustDoListStyles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0)", // Transparent background
  },
  reminderSettingButtonRow:{
    flexDirection: "row"
  },
  clearDataButtonText: {
    color: "white", // Text color, change as needed
    fontSize: 16,
  },
  reminderSettingBanner: {
    alignSelf: "center",
    width: "60%",
    height: "35%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
  },
  toDoTask: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  }
  // clearDataButton: {
  //   backgroundColor: "#f44336", // Example red color, change as needed
  //   padding: 10,
  //   borderRadius: 5,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   margin: 10,
  // },
  // clearDataButtonPressed: {
  //   backgroundColor: "#d32f2f", // Darker shade for pressed state
  // },
});

      // {!isLoggedIn && <Text>Please log in to view your selections!</Text>}

      // {/* Conditional Button: Get a private health care insurance */}
      // {["Planning to move", "Just arrived - 3 months"].includes(
      //   userSelections.lengthInCanada
      // ) && (
      //   <TextButton onPress={goToDetails}>
      //     <Text>Get a private health care insurance</Text>
      //   </TextButton>
      // )}
      // {/* Button: Apply for Medical Service Plan */}
      // {[
      //   "Planning to move",
      //   "Just arrived - 3 months",
      //   "More than 3 months",
      // ].includes(userSelections.lengthInCanada) && (
      //   <TextButton onPress={goToDetails}>
      //     <Text>Apply for Medical Service Plan</Text>
      //   </TextButton>
      // )}
      // {/* Conditional Button: Apply for Social Insurance Number */}
      // {userSelections.occupation === "Worker" ||
      //   (userSelections.studentWork === "Yes" && (
      //     <TextButton onPress={goToDetails}>
      //       <Text>Apply for Social Insurance Number</Text>
      //     </TextButton>
      //   ))}

      // {/* Conditional Button: Apply for driver's license */}
      // {userSelections.drive === "Yes" && (
      //   <TextButton onPress={goToDetails}>
      //     <Text>Apply for driver's license</Text>
      //   </TextButton>
      // )}

      // {/* Conditional Button: Get a compass card */}
      // {userSelections.needPublicTransportation === "Yes" && (
      //   <TextButton onPress={goToDetails}>
      //     <Text>Get a compass card</Text>
      //   </TextButton>
      // )}