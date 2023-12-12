import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, useWindowDimensions, ActivityIndicator } from "react-native";
import { styles } from "../helper/HelperStyles";
import DialogButton from "../components/DialogButton";
import IconButton from "../components/IconButton";
import { DEFAULT_SCREEN_WIDTH} from "../helper/Constants";
import { auth } from "../firebase/FirebaseSetup";
import { bookmarksCollectionRef } from "../firebase/FirebaseSetup";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export function ExploreScreen({ navigation, route }) {
  const {width} = useWindowDimensions();
  const buttonScale = width / DEFAULT_SCREEN_WIDTH;
  const [arrowButtonText, setArrowButtonText] = useState("")
  const [generatedMustDoList, setGeneratedMustDoList] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  //Dynamically change the Text of the ArrowButton on the upper right corner
  useEffect(()=>{
    const getMustDoList = async () => {
      console.log("isLoggedIn from Explore: ", isLoggedIn)
      try{
        if(isLoggedIn){
          const bookmarkDocRef = doc(bookmarksCollectionRef, auth.currentUser.uid);
          const docSnapshot = await getDoc(bookmarkDocRef)
          if (docSnapshot.exists()){
            setGeneratedMustDoList(docSnapshot.data().generatedMustDoList)
          } 
          setIsLoading(false)
        } else {
          setGeneratedMustDoList(route.params?.generatedMustDoList)
          setIsLoading(false)
        }
      } catch (err){
        console.log("Error from getting remote mustdolist of Explore: ", err)
      }
    }

    getMustDoList()
  }, [auth.currentUser, isLoggedIn])

  useEffect(()=>{
    if( generatedMustDoList && generatedMustDoList?.length !== 0){
      setArrowButtonText("Check\nMy Must-Do")
    } else {
      setArrowButtonText("Lost?\nBegin Here!")
    }
  }, [generatedMustDoList])

  const arrowButtonHandler = () => {
      if(generatedMustDoList && generatedMustDoList?.length !== 0){
        navigation.navigate("MustDoList", {
          generatedMustDoList: generatedMustDoList,
          userSelection: route.params?.userSelection})
      } else {
        navigation.navigate("MustDo")
      }
  };

  const essentialButtonHandler = () => {
    navigation.navigate("Essential");
  };
  const medicineButtonHandler = () => {
    navigation.navigate("Medicine");
  };
  const transitButtonHandler = () => {
    navigation.navigate("Transit");
  };
  
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/explore_background.png")}
        style={styles.backgroundPic}
      >
        <Text style={styles.text}>Tap Your Desired Topic to Start! </Text>
        
        <View style={styles.arrowButtonPosition}>
          {isLoggedIn && isLoading ? (
            <ActivityIndicator size="large" color="#FFBF1F" /> 
          ) : (
            <IconButton
              onPress={arrowButtonHandler}
              text={arrowButtonText}
              scale={buttonScale}
              type="arrow"
            />
          )}
        </View>

        <DialogButton
          onPress={essentialButtonHandler}
          text="Get Essential Docs"
          position={styles.essentialButtonPosition}
          scale={buttonScale}
        />

        <DialogButton
          onPress={medicineButtonHandler}
          text={"See Doctor?\nGet Meds?"}
          position={styles.medicineButtonPosition}
          scale={buttonScale}
        />

        <DialogButton
          onPress={transitButtonHandler}
          text="Use Public Transit"
          position={styles.transitButtonPosition}
          scale={buttonScale}
        />
      </ImageBackground>
    </View>
  );
}
