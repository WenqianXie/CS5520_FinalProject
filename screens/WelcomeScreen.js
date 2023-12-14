import React from "react";
import { View, Text } from "react-native";
import { styles } from "../helper/HelperStyles";
import { LinearGradient } from "expo-linear-gradient";

export default function WelcomeScreen() {
  //this is the welcome screen to be shown to the user only when the app is first opened
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#FEC542", "#C84000"]}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 1 }}
      style={styles.welcomeBackground}
    >
      <View style={styles.container}>
        <Text style={styles.welcomeTitle}>Just Arrive</Text>
        <Text style={styles.welcomeSlogan}>Arrive as a local</Text>
      </View>
    </LinearGradient>
  );
}
