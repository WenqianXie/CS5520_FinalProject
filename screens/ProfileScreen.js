import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Image,
  ActivityIndicator,
  Pressable,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextButton from "../components/TextButton";
import IconButton from "../components/IconButton";
import ImageManager from "../components/ImageManager";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/FirebaseSetup";
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { database, storage } from "../firebase/FirebaseSetup";
import { colors } from "../helper/HelperColors";
import { profileStyles } from "../helper/HelperStyles";
import { LinearGradient } from "expo-linear-gradient";

export function ProfileScreen({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [loading, setLoading] = useState(false); // State to track login status
  const [displayedName, setDisplayedName] = useState(null); // State to track displayed name
  const [modalVisible, setModalVisible] = useState(false);
  const [currAvatarURL, setCurrAvatarURL] = useState("");
  const [downloadAvatarURL, setDownloadAvatarURL] = useState("");

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
    async function getURL(avatarUrl) {
      const imageUriRef = ref(storage, avatarUrl);
      const url = await getDownloadURL(imageUriRef);
      setDownloadAvatarURL(url);
    }
    if (isLoggedIn) {
      setLoading(true); // Set loading to true while we fetch the users list
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
            });
            console.log("userList from ProfileScreen: ", usersList);
            setDisplayedName(usersList[0].username);
            if (usersList[0].avatarURL) {
              setCurrAvatarURL(usersList[0].avatarURL);
              getURL(usersList[0].avatarURL);
            }
            setLoading(false); // Set loading to false once we have the users list
          }
        }
      );

      return () => unsubscribe(); // Cleanup function
    }
  }, [isLoggedIn, auth.currentUser]); // Re-run the effect when isLoggedIn changes or auth.currentUser changes

  //Function to get the image to display, depending on whether the user is logged in and has uploaded an avatar photo before
  const getImage = (imageStyle) => {
    if (isLoggedIn && downloadAvatarURL) {
      return (
        <Image
          source={{ uri: downloadAvatarURL }}
          style={imageStyle} // if logged in and the user has uploaded an avatar photo before
          // use uri to get image, it is stored in firebase storage
        />
      );
    }
    return (
      <Image
        source={require("../assets/avatar.png")}
        style={imageStyle} // if not logged in or if the user hasn't uploaded an avatar photo before
        // use require to get image, it is stored in assets
      />
    );
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const enlargeProfilePic = () => {
    setModalVisible(!modalVisible);
  };

  const handleLogInPress = () => {
    navigation.push("Auth", { screen: "Login" }, "Profile"); // Navigate to the Login screen
  };

  const handleMyListPress = () => {
    navigation.navigate("MustDoList");
  };

  const handleLogOutPress = () => {
    try {
      signOut(auth);
    } catch (err) {
      console.log("signout err", err);
    }
  };
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#FEC542", "#C84000"]}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 1 }}
      style={profileStyles.welcomeBackground}
    >
      <SafeAreaView style={profileStyles.profileContainer}>
        <Modal
          animationType="fade"
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          {/* Wrap the whole modal in a Pressable to close the modal when the user clicks outside of the modal */}
          {/* The Pressable will be disabled when some function is running, to prevent the user from closing the modal before the function is finished */}
          <Pressable 
            onPress={closeModal}
            style={profileStyles.profileAvatarModalContainer}
          >
            <IconButton
              onPress={closeModal}
              type="close"
              position={profileStyles.profileAvatarModalCloseButton}
            />
            {getImage(profileStyles.profileAvatarModal)}
            <ImageManager closeModal={closeModal} currAvatarURL={currAvatarURL}/>
          </Pressable>
        </Modal>

        <View style={profileStyles.profilePhotoAndUsername}>
          <Pressable
            onPress={isLoggedIn ? enlargeProfilePic : null} // Pressable only enlarges the profile picture if logged in, does nothing if not logged in
            style={({ pressed }) => [
              pressed && profileStyles.buttonOnPress,
            ]}
          >
            {getImage(profileStyles.profileAvatar)}
          </Pressable>

          <View style={profileStyles.profileUsernameContainer}>
            {isLoggedIn &&
              (loading ? (
                <ActivityIndicator size="large" color={colors.themeDark} />
              ) : (
                <Text style={profileStyles.profileUsername}>{displayedName}</Text>
              ))}
          </View>
        </View>

        <TextButton
          onPress={handleMyListPress}
          style={profileStyles.fullWidthButton}
        >
          <Text style={profileStyles.buttonText}>To-Do List</Text>
        </TextButton>

        <TextButton
          onPress={isLoggedIn ? handleLogOutPress : handleLogInPress}
          style={profileStyles.fullWidthButton}
        >
          <Text style={profileStyles.buttonText}>
            {isLoggedIn ? "Log Out" : "Log In"}
          </Text>
        </TextButton>
      </SafeAreaView>
    </LinearGradient>
  );
}
