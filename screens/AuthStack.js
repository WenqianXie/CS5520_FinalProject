import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false, // Hides the back button title (screen name)
      }}
    >
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
