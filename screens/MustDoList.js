import { View, Text, StyleSheet, Alert, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import { database, auth } from "../firebase/FirebaseSetup";
import TextButton from "../components/TextButton";
import { deleteSelectionsFromUsersDB } from "../firebase/FirebaseHelper";
import { FlatList } from "react-native-gesture-handler";

export default function MustDoList({ navigation }) {
  const [userSelections, setUserSelections] = useState([]); // State to track userSelection
  const [randomImageUrl, setRandomImageUrl] = useState("");
  useEffect(() => {
    const userQuery = query(
      collection(database, "users"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
      if (!querySnapshot.empty) {
        // console.log("log from querySnapshot.doc: ", querySnapshot.data());
        querySnapshot.forEach((docSnap) => {
          setUserSelections(docSnap.data().userSelection); // Set the userSelection state to the fetched data));
        });
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []); // Empty dependency array means this effect runs once after the component mounts

  const handleClearSelections = () => {
    try {
      deleteSelectionsFromUsersDB();
      Alert.alert(
        "Data Cleared",
        "Your selections has been successfully cleared.",
        [
          {
            text: "Home",
            onPress: () => navigation.navigate("Home"),
          },
        ]
      );
    } catch (error) {
      console.error("Error clearing data: ", error);
      Alert.alert("Error", "Failed to clear data.");
    }
  };

  const handleChangeAnswers = () => {
    navigation.navigate("MustDo");
  };

  const handleExplore = () => {
    navigation.navigate("Home", { screen: "Explore" });
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

  return (
    <View>
      <Image
        source={{ uri: randomImageUrl }}
        style={{ width: "100%", height: 400 }} // Adjust the width and height as needed
        resizeMode="cover"
      />
      <Text>{userSelections.lengthInCanada}</Text>
      <Text>{userSelections.occupation}</Text>
      <Text>{userSelections.occupation}</Text>
      <TextButton onPress={handleClearSelections}>
        <Text style={styles.clearDataButtonText}>Clear All My Selections</Text>
      </TextButton>
      <TextButton onPress={handleChangeAnswers}>
        <Text style={styles.clearDataButtonText}>Update My Answers</Text>
      </TextButton>
      <TextButton onPress={handleExplore}>
        <Text style={styles.clearDataButtonText}>Ready To Explore</Text>
      </TextButton>
    </View>
  );
}

const styles = StyleSheet.create({
  clearDataButton: {
    backgroundColor: "#f44336", // Example red color, change as needed
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  clearDataButtonPressed: {
    backgroundColor: "#d32f2f", // Darker shade for pressed state
  },
  clearDataButtonText: {
    color: "white", // Text color, change as needed
    fontSize: 16,
  },
});
