// WelcomeScreen.js
import React, { useEffect, useState } from "react";
import { View, Text,  } from "react-native";
import { welcomeStyles } from "../helper/HelperStyles";

export default function WelcomeScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Home");
    }, 2000); // 3 seconds
  }, [navigation]);

  return (
    <View style={welcomeStyles.container}>
      <Text style={welcomeStyles.title}>Just Arrive</Text>
      <Text style={welcomeStyles.slogan}>Arrive as a local</Text>
    </View>
  );
}
