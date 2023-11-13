import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PressableButton from "./PressableButton";

export function ProfileScreen({ navigation }) {
  const handleLogInPress = () => {
    navigation.push("Auth", { screen: "Login" }); // Navigate to the Login screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      <PressableButton
        pressedFunction={handleLogInPress}
        defaultStyle={styles.loginButton}
        pressedStyle={styles.loginButtonPressed}
      >
        <Text style={styles.loginButtonText}>Log in</Text>
      </PressableButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
  loginButton: {
    padding: 10,
    margin: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  loginButtonPressed: {
    backgroundColor: "#0056b3",
  },
  loginButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
