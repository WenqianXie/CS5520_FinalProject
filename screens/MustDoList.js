import {
  View,
  Text,
  StyleSheet,
  Alert,
  Modal,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { auth } from "../firebase/FirebaseSetup";
import TextButton from "../components/TextButton";
import { deleteSelectionsFromUsersDB } from "../firebase/FirebaseHelper";
import { FlatList } from "react-native-gesture-handler";
import { bookmarksCollectionRef } from "../firebase/FirebaseSetup";
import EntryButtonTextHelper from "../helper/EntryButtonTextHelper";
import { onAuthStateChanged } from "firebase/auth";
import IconButton from "../components/IconButton";
import ReminderSetter from "../components/ReminderSetter";
import { authStyles } from "../helper/HelperStyles";

export default function MustDoList({ navigation, route }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [generatedMustDoList, setGeneratedMustDoList] = useState([]);
  const [bookmarkList, setBookmarkList] = useState([]);
  const [randomImageUrl, setRandomImageUrl] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [reminderInfo, setReminderInfo] = useState({
    title: "",
    body: "",
    data: null,
  });
  const [reminderDateTime, setReminderDateTime] = useState();

  const passDateTime = (currentDate) => {
    setDateTime(currentDate);
  };

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
          console.log(
            "Received generatedMustDoList from database: ",
            docSnapshot.data().generatedMustDoList
          );
          setGeneratedMustDoList(docSnapshot.data().generatedMustDoList);
          setBookmarkList(docSnapshot.data().bookmarkList);
        }
      });

      return () => unsubscribe();
    } else {
      // if no user is logged in, set generatedMustDoList to the passed in data if any
      if (route.params?.generatedMustDoList) {
        console.log(
          "Received generatedMustDoList from local: ",
          route.params.generatedMustDoList
        );
        setGeneratedMustDoList(route.params.generatedMustDoList);
      }
    }
  }, [isLoggedIn, auth.currentUser]); // Empty dependency array means this effect runs once after the component mounts

  const passModalVisible = (visible) => {
    setModalVisible(visible);
  };

  const createReminderHandler = (item) => {
    setReminderDateTime(new Date()); // default reminder's date and time is now
    const info = EntryButtonTextHelper(item);
    const data = { navigation: item };
    console.log("reminder data: ", data);
    setReminderInfo({
      title: info,
      body: "Tap to know how to " + info,
      data: data,
    });
    setModalVisible(true);
  };

  const passChangedDateTime = (dateTime) => {
    setReminderDateTime(dateTime);
  };

  const finishDeletionAlert = () =>
    Alert.alert(
      "Data Cleared",
      "Your selections has been successfully cleared.",
      [
        {
          text: "Home",
          onPress: () =>
            navigation.replace("Home", {
              screen: "Explore",
              params: null,
            }),
        },
      ]
    );

  const clearData = async () => {
    try {
      await deleteSelectionsFromUsersDB();
      finishDeletionAlert();
    } catch (err) {
      console.error("Error clearing data: ", err);
      Alert.alert("Error", "Failed to clear data.");
    }
  };

  const handleClearSelections = () => {
    if (isLoggedIn) {
      Alert.alert(
        "Notice",
        "Confirm to clear? This will also wipe out your current Must-Do List.",
        [
          {
            text: "Cancel",
          },
          {
            text: "Confirm",
            onPress: clearData,
          },
        ]
      );
    } else {
      finishDeletionAlert();
    }
  };

  const handleChangeAnswers = () => {
    if (isLoggedIn) {
      navigation.navigate("MustDo");
    } else {
      if (route.params?.userSelection) {
        navigation.navigate("MustDo", {
          userSelection: route.params.userSelection,
        });
      }
    }
  };

  const handleExplore = () => {
    if (isLoggedIn) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("Home", {
        screen: "Explore",
        params: {
          generatedMustDoList: generatedMustDoList,
          userSelection: route.params?.userSelection,
        },
      });
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
    <ImageBackground
      source={{ uri: randomImageUrl || null }}
      style={mustDoListStyles.fullscreen}
      resizeMode="cover"
    >
      {/*Modal for setting reminder by dateTime*/}
      <Modal transparent={true} animationType="fade" visible={modalVisible}>
        <ReminderSetter
          reminderInfo={reminderInfo}
          dateTime={reminderDateTime}
          changeDateTime={passChangedDateTime}
          keepOpen={passModalVisible}
        />
      </Modal>
      <View style={mustDoListStyles.outerContainer}>
        <FlatList
          data={generatedMustDoList}
          style={{ marginTop: 100, marginBottom: 10 }}
          renderItem={({ item, index }) => {
            if (item === "nothing") {
              return (
                <View style={mustDoListStyles.taskContainer}>
                  <Text style={mustDoListStyles.taskText}>
                    {
                      "Great news!\nYou've covered all the essential tasks based on the information provided."
                    }
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={mustDoListStyles.taskContainer}>
                  <View style={mustDoListStyles.toDoTask}>
                    <TouchableOpacity
                      onPress={() => goToDetails(item)}
                      style={mustDoListStyles.buttonTextContainer}
                    >
                      <Text style={mustDoListStyles.taskText}>
                        {EntryButtonTextHelper(item)}
                      </Text>
                    </TouchableOpacity>
                    <IconButton
                      onPress={() => createReminderHandler(item)}
                      type="reminder"
                    />
                  </View>
                </View>
              );
            }
          }}
        />
      </View>
      <View style={mustDoListStyles.buttonContainer}>
        <TouchableOpacity
          onPress={handleClearSelections}
          style={mustDoListStyles.button}
        >
          <Text style={mustDoListStyles.clearDataButtonText}>
            Clear All My Selections
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleChangeAnswers}
          style={mustDoListStyles.button}
        >
          <Text style={mustDoListStyles.clearDataButtonText}>
            Update My Answers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleExplore}
          style={mustDoListStyles.button}
        >
          <Text style={mustDoListStyles.clearDataButtonText}>
            Ready To Explore
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const mustDoListStyles = StyleSheet.create({
  outerContainer: {},
  fullscreen: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // This ensures the overlay covers the full screen
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  toDoTask: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    marginHorizontal: 10,
  },
  taskText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  taskContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    marginTop: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContainer: { marginTop: 50 },
  button: {
    backgroundColor: "#FFB703",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  clearDataButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
