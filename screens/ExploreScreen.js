import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { styles } from "../helper/HelperStyles";
import DialogButton from "../components/DialogButton";
import { colors } from "../helper/HelperColors";
import ArrowButton from "../components/ArrowButton";

export function ExploreScreen({ navigation }) {
  const arrowButtonHandler = () => {
    navigation.navigate("MustDo", { questionType: "lengthInCanada" });
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
        <ArrowButton
          onPress={arrowButtonHandler}
          text={"Lost?\nBegin Here!"}
          position={styles.arrowButtonPosition}
        />

        <DialogButton
          onPress={essentialButtonHandler}
          text="Obtain Essential Docs"
          position={styles.essentialButtonPosition}
        />

        <DialogButton
          onPress={medicineButtonHandler}
          text="See Doctor?Get Meds?"
          position={styles.medicineButtonPosition}
        />

        <DialogButton
          onPress={transitButtonHandler}
          text="Use Public Transit"
          position={styles.transitButtonPosition}
        />
      </ImageBackground>
    </View>
  );
}
