import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import { database, auth } from "../firebase/FirebaseSetup";

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

  // Rest of your component rendering

  return (
    <View>
      <Text>{userLengthInCanada}</Text>
    </View>
  );
}
