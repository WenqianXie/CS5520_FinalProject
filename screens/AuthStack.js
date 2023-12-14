import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const Stack = createStackNavigator();

export default function AuthNavigator() {
  // this is the navigator for the authentication screens
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false, 
        headerStyle: { backgroundColor: "#FFBF1F" }, 
        headerTintColor: "#023047", 
        headerTitleStyle: { fontWeight: "bold" }, 
      }}
    >
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{ title: "Log In" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: "Sign Up" }}
      />
    </Stack.Navigator>
  );
}
