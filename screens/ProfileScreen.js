import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PressableButton from "../components/PressableButton";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/FirebaseSetup";
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import { database } from "../firebase/FirebaseSetup";

export function ProfileScreen({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [displayedName, setDisplayedName] = useState(null); // State to track displayed name
  const [user, setUser] = useState(null); // State to track users list
  // const [resetType, setResetType] = useState(null); // 'username', 'email', or 'password'

  useEffect(() => {
    console.log("useEffect");
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // a valid user is logged in
        setIsLoggedIn(true);
      } else {
        //before authentication or after logout
        setIsLoggedIn(false);
      }
    });
  }, []);
  console.log(isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      const unsubscribe = onSnapshot(
        query(
          collection(database, "users"),
          where("userId", "==", auth.currentUser.uid)
        ),
        (querySnapshot) => {
          if (!querySnapshot.empty) {
            let usersList = [];
            querySnapshot.docs.forEach((docSnap) => {
              usersList.push({ ...docSnap.data(), id: docSnap.id });
              console.log("ok");
            });
            console.log(usersList);
            setUser(usersList);
            setDisplayedName(usersList[0].username);
          } else {
            setUser([]); // If the collection is empty or the query returns no documents, set the users list to empty
          }
        }
      );

      return () => unsubscribe(); // Cleanup function
    }
  }, [isLoggedIn]); // Re-run the effect when isLoggedIn changes

  const handleLogInPress = () => {
    navigation.push("Auth", { screen: "Login" }); // Navigate to the Login screen
  };

  const handleMyListPress = () => {};

  const handleEmailPress = () => {
    // setResetType("email");
    navigation.navigate("Reset", { resetType: "email", headerTitle: "Reset Email" });
  };

  const handlePasswordPress = () => {
    // setResetType("password");
    navigation.navigate("Reset", { resetType: "password", headerTitle: "Reset Password"});
  };

  const handleLogOutPress = () => {
    try {
      signOut(auth);
    } catch (err) {
      console.log("signout err", err);
    }
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
      <PressableButton
        pressedFunction={handleMyListPress}
        defaultStyle={styles.loginButton}
        pressedStyle={styles.loginButtonPressed}
      >
        <Text style={styles.loginButtonText}>My must-do list</Text>
      </PressableButton>

      <PressableButton
        pressedFunction={handleEmailPress}
        defaultStyle={styles.loginButton}
        pressedStyle={styles.loginButtonPressed}
      >
        <Text style={styles.loginButtonText}>Reset Email</Text>
      </PressableButton>

      <PressableButton
        pressedFunction={handlePasswordPress}
        defaultStyle={styles.loginButton}
        pressedStyle={styles.loginButtonPressed}
      >
        <Text style={styles.loginButtonText}>Reset Password</Text>
      </PressableButton>

      <PressableButton
        pressedFunction={handleLogOutPress}
        defaultStyle={styles.loginButton}
        pressedStyle={styles.loginButtonPressed}
      >
        <Text style={styles.loginButtonText}>Log Out</Text>
      </PressableButton>
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
    marginLeft: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    // alignSelf: “flex-start”,
    margin: 10,
  },
});
