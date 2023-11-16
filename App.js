import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./components/WelcomeScreen";
import Home from "./components/Home";
import AuthNavigator from "./components/AuthStack";
import Reset from "./components/Reset";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Reset" component={Reset} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
