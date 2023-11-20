import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import { database, auth } from "../firebase/FirebaseSetup";
import TextButton from "../components/TextButton";
import { deleteFromUsersDB } from "../firebase/FirebaseHelper";

export default function MustDoList() {
  const [userLengthInCanada, setUserLengthInCanada] = useState(null);

  useEffect(() => {
    const userQuery = query(
      collection(database, "users"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
      const selections = [];
      if (!querySnapshot.empty) {
        querySnapshot.docs.forEach((docSnap) => {
          selections.push({ ...docSnap.data(), id: docSnap.id });
        });
        console.log(selections); // Logging the fetched data
        setUserLengthInCanada(selections[0].userSelection.lengthInCanada); // Set the userSelection state to the fetched data));
      } else {
        setUserSelection([]); // Set to empty if no documents are found
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []); // Empty dependency array means this effect runs once after the component mounts

  const handleClearData = () => {
    try {
      deleteFromUsersDB(auth.currentUser.uid);
      Alert.alert("Data Cleared", "Your data has been successfully cleared.");
    } catch (error) {
      console.error("Error clearing data: ", error);
      Alert.alert("Error", "Failed to clear data.");
    }
  };

  return (
    <View>
      <Text>{userLengthInCanada}</Text>
      <TextButton
        pressedFunction={handleClearData}
        defaultStyle={styles.clearDataButton}
        pressedStyle={styles.clearDataButtonPressed}
      >
        <Text style={styles.clearDataButtonText}>Clear All My Data</Text>
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
