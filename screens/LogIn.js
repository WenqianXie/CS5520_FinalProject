import { useState, useEffect } from "react";
import {
  ImageBackground,
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/FirebaseSetup";
import { authStyles } from "../helper/HelperStyles";

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [randomImageUrl, setRandomImageUrl] = useState("");

  const signupHandler = () => {
    navigation.replace("SignUp");
  };

  // const loginHandler = async () => {
  //   if (!email || !password) {
  //     Alert.alert("Please fill all the fields");
  //     return;
  //   }

  //   try {
  //     const userCred = await signInWithEmailAndPassword(auth, email, password);
  //     console.log(userCred);
  //     navigation.navigate("Profile");
  //   } catch (err) {
  //     console.log(err);
  //     if (err.code === "auth/invalid-login-credentials") {
  //       Alert.alert("invalid credentials");
  //     }
  //   }
  // };

  const loginHandler = async () => {
    if (!email || !password) {
      Alert.alert("Please fill all the fields");
      return;
    }

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCred);
      navigation.navigate("Profile");
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
        <Text style={authStyles.label}>Email</Text>
        <TextInput
          placeholder="Email"
          style={authStyles.input}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={authStyles.label}>Password</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={authStyles.input}
          value={password}
          onChangeText={setPassword}
        />
        <View style={authStyles.buttonContainer}>
          <TouchableOpacity
            style={authStyles.customButton}
            onPress={loginHandler}
          >
            <Text style={authStyles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={authStyles.customButton}
            onPress={signupHandler}
          >
            <Text style={authStyles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
