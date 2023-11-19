import React from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import { styles } from "../helper/HelperStyles";
import DialogButton from "../components/DialogButton";

export function ExploreScreen({navigation}) {
  const handleEssential = () => {
    navigation.navigate("Essential");
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/explore_background.png")} style={styles.backgroundPic}>

        <Text style={styles.text}>Tap Your Desired Topic to Start! </Text>

        <DialogButton 
          onPress={handleEssential} 
          text="Obtain Essential Docs" 
          position={styles.essentialButtonPosition}/>

        <DialogButton 
          onPress={handleEssential} 
          text='See Doctor?Get Meds?'
          position={styles.medicineButtonPosition}/>

        <DialogButton 
          onPress={handleEssential} 
          text='Use Public Transit'
          position={styles.transitButtonPosition}/>
      </ImageBackground>
    </View>
  );
}


