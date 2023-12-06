import React, { useState, useEffect } from "react";
import { View, Text, Modal, Image, ActivityIndicator, Pressable } from "react-native";
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
import { styles } from "../helper/HelperStyles";

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
  }, []);

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
  }, [isLoggedIn]); // Re-run the effect when isLoggedIn changes

  //Function to get the image to display, depending on whether the user is logged in and has uploaded an avatar photo before
  const getImage = (imageStyle) => {
    if (isLoggedIn && downloadAvatarURL){
      return (
      <Image
        source={{ uri: downloadAvatarURL }}
        style={imageStyle} // if logged in and the user has uploaded an avatar photo before
                           // use uri to get image, it is stored in firebase storage
      />
      )} 
    return (
      <Image
        source={require("../assets/avatar.png")}
        style={imageStyle} // if not logged in or if the user hasn't uploaded an avatar photo before
                           // use require to get image, it is stored in assets
      />
    )
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  const enlargeProfilePic = () => {
    setModalVisible(!modalVisible);
  }

  const handleLogInPress = () => {
    navigation.push("Auth", { screen: "Login" }, "Profile"); // Navigate to the Login screen
  };

  const handleMyListPress = () => {
    navigation.navigate("MustDoList");
  };

  // const handleEmailPress = () => {
  //   // setResetType("email");
  //   navigation.navigate("Reset", {
  //     resetType: "email",
  //     headerTitle: "Reset Email",
  //   });
  // };

  // const handlePasswordPress = () => {
  //   // setResetType("password");
  //   navigation.navigate("Reset", {
  //     resetType: "password",
  //     headerTitle: "Reset Password",
  //   });
  // };

  const handleLogOutPress = () => {
    try {
      signOut(auth);
    } catch (err) {
      console.log("signout err", err);
    }
  };
  return (
    <SafeAreaView style={styles.profileContainer}>
      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        {/* Wrap the whole modal in a Pressable to close the modal when the user clicks outside of the modal */}
        {/* The Pressable will be disabled when some function is running, to prevent the user from closing the modal before the function is finished */}
        <Pressable 
          onPress={closeModal}
          style={styles.profileAvatarModalContainer}
        >
          <IconButton
            onPress={closeModal}
            type="close"
          />
          {getImage(styles.profileAvatarModal)}
          <ImageManager closeModal={closeModal} currAvatarURL={currAvatarURL}/>
        </Pressable>
      </Modal>

      <View style={styles.profilePhotoAndUsername}>
        <Pressable
          onPress={isLoggedIn ? enlargeProfilePic : handleLogInPress}
          style={({pressed})=>[
            styles.profileAvatar,
            pressed && (styles.buttonOnPress),
          ]}>
          {getImage(styles.profileAvatar)}
        </Pressable>

        {isLoggedIn ? (
          loading ? ( // If loading is true, display an ActivityIndicator
            <ActivityIndicator size="large" color={colors.themeDark} />
          ) : (
            <Text style={styles.textButtonText}>{displayedName}</Text> // Display username if logged in and loading is false
          )
        ) : (
          <TextButton onPress={handleLogInPress}>
            <Text style={styles.textButtonText}>Log in</Text>
          </TextButton>
        )}
      </View>

      <TextButton onPress={handleMyListPress}>
        <Text style={styles.textButtonText}>My Must-Do List</Text>
      </TextButton>

      {/* <TextButton onPress={handleEmailPress}>
        <Text style={styles.textButtonText}>Reset Email</Text>
      </TextButton>

      <TextButton onPress={handlePasswordPress}>
        <Text style={styles.textButtonText}>Reset Password</Text>
      </TextButton> */}

      <TextButton onPress={handleLogOutPress}>
        <Text style={styles.textButtonText}>Log Out</Text>
      </TextButton>
    </SafeAreaView>
  );
}
