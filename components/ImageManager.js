import React from 'react'
import { Text } from 'react-native';
import TextButton from './TextButton';
import * as ImagePicker from "expo-image-picker";
import { styles } from '../helper/HelperStyles';
import { storage } from '../firebase/FirebaseSetup';
import { ref, uploadBytesResumable  } from 'firebase/storage';
import { writeToUsersDB } from '../firebase/FirebaseHelper';
const ImageManager = ({closeModal}) => {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

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
        return result?.assets[0]?.uri
    } catch (err){
        console.log("take image error ", err);
    }
  };

  async function uploadImageToStorage(localUri) {
    try {
      const response = await fetch(localUri);
      const imageBlob = await response.blob();
      const imageName = localUri.substring(localUri.lastIndexOf("/") + 1);
      const imageRef = await ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, imageBlob);
      return uploadResult.metadata.fullPath;
    } catch (err) {
      console.log(err);
    }
  }

  async function changeAvatarHandler() {
    try {
      const localUri = await takeImage();
      if (localUri) {
        const storageUri = await uploadImageToStorage(localUri);
        if (storageUri){
          writeToUsersDB({ avatarURL: storageUri })
        }
      }
    } catch (err) {
      console.log(err);
    }
    closeModal();
  }


  return (
        <TextButton onPress={changeAvatarHandler}>
          <Text style={styles.textButtonText}>Change Avatar</Text>
        </TextButton>
  )
}

export default ImageManager
