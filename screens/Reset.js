import { View, Text, Alert, Button, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { writeToUsersDB } from "../firebase/FirebaseHelper";
import {
  getAuth,
  updateEmail,
  updatePassword,
  deleteUser,
} from "firebase/auth";

const auth = getAuth();

export default function ResetScreen({ route, navigation }) {
  const { resetType } = route.params;
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  // const handleReset = async () => {
  //   if (resetType === "username") {
  //     if (!username) {
  //       Alert.alert("Please enter a new username");
  //       return;
  //     }
  //     writeToUsersDB({ username: username });
  //     navigation.navigate("Profile");
  //   } else if (resetType === "email") {
  //     if (!email) {
  //       Alert.alert("Please enter a new email");
  //       return;
  //     }
  //     writeToUsersDB({ email: email });
  //     navigation.navigate("Profile");
  //   } else if (resetType === "password") {
  //     if (!password || !confirmPassword) {
  //       Alert.alert("Please fill all the password fields");
  //       return;
  //     }
  //     if (confirmPassword !== password) {
  //       Alert.alert("Passwords do not match");
  //       return;
  //     }
  //     // writeToUsersDB({ password: password });
  //     navigation.navigate("Profile");
  //   }
  // };

  const handleReset = async () => {
    if (resetType === "username") {
      if (!username) {
        Alert.alert("Please enter a new username");
        return;
      }
      writeToUsersDB({ username: username });
      navigation.navigate("Profile");
    } else if (resetType === "email") {
      if (!email) {
        Alert.alert("Please enter a new email");
        return;
      }
      updateEmail(auth.currentUser, email)
        .then(() => {
          writeToUsersDB({ email: email });
          Alert.alert("Email updated successfully!");
          navigation.navigate("Profile");
        })
        .catch((error) => {
          Alert.alert("Error updating email", error.message);
        });
    } else if (resetType === "password") {
      if (!password || !confirmPassword) {
        Alert.alert("Please fill all the password fields");
        return;
      }
      if (confirmPassword !== password) {
        Alert.alert("Passwords do not match");
        return;
      }
      updatePassword(auth.currentUser, password)
        .then(() => {
          Alert.alert("Password updated successfully!");
          navigation.navigate("Profile");
        })
        .catch((error) => {
          Alert.alert("Error updating password", error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      {resetType === "username" && (
        <TextInput
          style={styles.input}
          placeholder="New Username"
          value={username}
          onChangeText={setUsername}
        />
      )}
      {resetType === "email" && (
        <TextInput
          style={styles.input}
          placeholder="New Email"
          value={email}
          onChangeText={setEmail}
        />
      )}
      {resetType === "password" && (
        <>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="New Password"
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </>
      )}
      <Button title="Reset" onPress={handleReset} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    // borderColor: "#552055",
    borderWidth: 20,
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
});
