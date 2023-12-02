import React from "react";
import { View, Text, ImageBackground, useWindowDimensions } from "react-native";
import { styles } from "../helper/HelperStyles";
import DialogButton from "../components/DialogButton";
import IconButton from "../components/IconButton";
import { DEFAULT_SCREEN_WIDTH} from "../helper/Constants";

export function ExploreScreen({ navigation }) {
  const {width} = useWindowDimensions();
  const buttonScale = width / DEFAULT_SCREEN_WIDTH;
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
        <IconButton
          onPress={arrowButtonHandler}
          text={"Lost?\nBegin Here!"}
          position={styles.arrowButtonPosition}
          scale={buttonScale}
          type="arrow"
        />

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
