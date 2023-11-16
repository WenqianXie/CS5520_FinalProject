import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/FirebaseSetup";
import { writeToUsersDB } from "../firebase/FirebaseHelper";

export default function SignUp({ navigation }) {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const loginHandler = () => {
    navigation.replace("LogIn");
  };

  const signupHandler = async () => {
    if (!email || !password || !confirmPassword || !username) {
      Alert.alert("Please fill all the fields");
      return;
    }
    if (confirmPassword !== password) {
      Alert.alert("Passwords do not match");
      return;
    }
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCred);
      writeToUsersDB({ username: username, email: email });
      navigation.navigate("LogIn");
    } catch (err) {
      console.log("sign up error ", err.code);
      if (err.code === "auth/invalid-email") {
        Alert.alert("email is invalid");
      } else if (err.code === "auth/weak-password") {
        Alert.alert("password should be minimum 6 characters");
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(changedText) => {
          setUsername(changedText);
        }}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(changedText) => {
          setEmail(changedText);
        }}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={(changedText) => {
          setPassword(changedText);
        }}
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(changedText) => {
          setConfirmPassword(changedText);
        }}
      />
      <Button title="Register" onPress={signupHandler} />
      <Button title="Already Registered? Login" onPress={loginHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  input: {
    borderColor: "#552055",
    borderWidth: 2,
    width: "90%",
    margin: 5,
    padding: 5,
  },
  label: {
    marginLeft: 10,
  },
});
