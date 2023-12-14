// Purpose: Helper component to handle uploading image to the database

import React, { useState } from 'react'
import { Text, Alert, ActivityIndicator, StyleSheet, Modal, View } from 'react-native';
import TextButton from './TextButton';
import * as ImagePicker from "expo-image-picker";
import { styles } from '../helper/HelperStyles';
import { storage } from '../firebase/FirebaseSetup';
import { ref, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { writeToUsersDB } from '../firebase/FirebaseHelper';
import { colors } from '../helper/HelperColors';
const ImageManager = ({closeModal, currAvatarURL}) => {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [loading, setLoading] = useState(false); // State to track login status

  const verifyPermission = async () => {
    if(status.granted){
        return true;
    }
    const response = await requestPermission();
    return response.granted;
  };

  const takeImage = async () => {
    try{
        const hasPermission = await verifyPermission();
        if(!hasPermission){
            Alert.alert("You need to give access to the camera");
        }
        //   if hasPermission, launch the camera
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
        });
        if(!result.assets){
            return null;
        } else {
          return result.assets[0].uri
        }
    } catch (err){
        console.log("take image error ", err);
    }
  };

  async function uploadImageToStorage(localUri) {
    try {
      const response = await fetch(localUri);
      const imageBlob = await response.blob();
      const imageName = localUri.substring(localUri.lastIndexOf("/") + 1);
      const imageRef = await ref(storage, `UserAvatarImages/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, imageBlob);
      if(currAvatarURL){
        deleteObject(ref(storage, currAvatarURL)); // delete the old avatar image
      }
      return uploadResult.metadata.fullPath;
    } catch (err) {
      console.log(err);
    }
  }

  async function confirmUploadImageHandler(localUri) {
    try{
      if (localUri) {
        setLoading(true);
        const storageUri = await uploadImageToStorage(localUri);
        if (storageUri){
          await writeToUsersDB({ avatarURL: storageUri })
          setLoading(false);
          closeModal();
        }
      } else {
        Alert.alert("Please take a photo first")
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function changeAvatarHandler() {
    try {
      const localUri = await takeImage();
      if (localUri) {
          Alert.alert("Confirm", "Are you sure you want to change your avatar?", [
            {
              text: "Cancel"
            },
            {
              text: "Confirm",
              onPress: () => confirmUploadImageHandler(localUri)
            }
          ])
      }
    } catch (err) {
      console.log(err);
    }
  }

// component will pull up the camera to take a photo, then upload the photo to the database
// while uploading, a modal will be shown to indicate the uploading status and prevent user from stopping the upload
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={loading}
      >
      <View style={ImageManagerStyles.modalContainer}>
        <View style={ImageManagerStyles.modalAlertContainer}>
          <Text 
            style={ImageManagerStyles.modalAlertText}
          >
            Uploading...
          </Text>
          <ActivityIndicator size="large" color={colors.themeDark} />
        </View>
      </View>
      </Modal>

        <TextButton 
          onPress={changeAvatarHandler}
          disabled={loading}
        >
          <Text style={styles.textButtonText}>Change Avatar</Text>
        </TextButton>
    </View>
  )
}

export default ImageManager


const ImageManagerStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
  },
  modalAlertContainer: {
    width: "30%",
    height: "10%",
    backgroundColor: colors.auxiliaryColor,
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
      // Shadow properties for iOS
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 4,
  },
  modalAlertText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
})
