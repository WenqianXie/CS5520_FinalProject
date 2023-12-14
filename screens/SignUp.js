import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/FirebaseSetup";
import { writeToUsersDB } from "../firebase/FirebaseHelper";
import { authStyles } from "../helper/HelperStyles";

export default function SignUp({ navigation }) {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [randomImageUrl, setRandomImageUrl] = useState("");

  const loginHandler = () => {
    navigation.replace("LogIn");
  };

  const autoLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Profile");
    } catch (err) {
      console.log(err);
      if (err.code === "auth/invalid-login-credentials") {
        Alert.alert("invalid credentials");
      }
    }
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
      autoLogin();
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          Alert.alert("Incorrect email or password.");
          break;
        case "auth/wrong-password":
          Alert.alert("Incorrect email or password.");
          break;
        case "auth/invalid-email":
          Alert.alert("Invalid Email address.");
          break;
        default:
          Alert.alert("An error occurred. Please try again.");
          break;
      }
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

  return (
    <ImageBackground
      source={{ uri: randomImageUrl || null }}
      style={authStyles.fullscreen}
      resizeMode="cover"
    >
      <View style={authStyles.contentContainer}>
        <Text style={authStyles.label}>Username</Text>
        <TextInput
          style={authStyles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={authStyles.label}>Email</Text>
        <TextInput
          style={authStyles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={authStyles.label}>Password</Text>
        <TextInput
          style={authStyles.input}
          secureTextEntry={true}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />

        <Text style={authStyles.label}>Confirm Password</Text>
        <TextInput
          style={authStyles.input}
          secureTextEntry={true}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <View style={authStyles.buttonContainer}>
          <TouchableOpacity
            style={authStyles.customButton}
            onPress={signupHandler}
          >
            <Text style={authStyles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={authStyles.customButton}
            onPress={loginHandler}
          >
            <Text style={authStyles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
