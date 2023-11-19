// WelcomeScreen.js
import React, { useEffect, useState } from "react";
import { View, Text,  } from "react-native";
import { styles } from "../helper/HelperStyles";

export default function WelcomeScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Home");
    }, 1000); // 1 second
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeTitle}>Just Arrive</Text>
      <Text style={styles.welcomeSlogan}>Arrive as a local</Text>
    </View>
  );
}
