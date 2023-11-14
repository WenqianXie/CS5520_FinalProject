import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PressableButton from "./PressableButton";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/FirebaseSetup";
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import { database } from "../firebase/FirebaseSetup";

export function ProfileScreen({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [displayedName, setDisplayedName] = useState(null); // State to track displayed name
  const [user, setUser] = useState(null); // State to track user data

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(database, "users"),
        where("userId", "==", auth.currentUser.uid) // Ensure security by filtering for the current user's UID
      ),
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          let usersList = [];
          querySnapshot.docs.forEach((docSnap) => {
            // Retrieve only username, email, and uid from each document
            // const { username, email, uid } = docSnap.data();
            usersList.push({ ...docSnap.data(), id: docSnap.id });
            console.log(usersList);
          });
          setUser(usersList);
          setDisplayedName(usersList[0].username);
          console.log("user:");
          console.log(user);
          console.log(displayedName);

          // Update your state or context with the users list
        } else {
          setUser([]); // If the collection is empty or the query returns no documents, set the users list to empty
        }
      }
    ); // This is a listener to the users collection in the database

    return () => unsubscribe(); // Cleanup function to unsubscribe from the listener when the component unmounts
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user);
      if (user) {
        // a valid user is logged in
        setIsLoggedIn(true);
        // setDisplayedName(user.username);
      } else {
        //before authentication or after logout
        setIsLoggedIn(false);
      }
    });
  }, []);

  const handleLogInPress = () => {
    navigation.push("Auth", { screen: "Login" }); // Navigate to the Login screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profile}>
        <Image
          source={require("../assets/avatar.png")}
          style={styles.avatar} // use require to get image, it is stored in assets
        />
        {isLoggedIn ? (
          <Text style={styles.loginButtonText}>{displayedName}</Text> // Display username if logged in
        ) : (
          <PressableButton
            pressedFunction={handleLogInPress}
            defaultStyle={styles.loginButton}
            pressedStyle={styles.loginButtonPressed}
          >
            <Text style={styles.loginButtonText}>Log in</Text>
          </PressableButton>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "left",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 25,
  },
  loginButton: {
    padding: 10,
    margin: 10,
    // backgroundColor: "#007bff",
    borderRadius: 5,
  },
  loginButtonPressed: {
    // backgroundColor: "#0056b3",
  },
  loginButtonText: {
    color: "black",
    textAlign: "center",
    fontSize: 25,
  },
  avatar: {
    width: 100,
    height: 100,
    // alignSelf: “flex-start”,
    margin: 10,
  },
});
