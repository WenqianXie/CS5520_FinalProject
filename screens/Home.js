import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { ExploreScreen } from "./ExploreScreen";
import { ProfileScreen } from "./ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";

const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
        // You can load as many fonts as you like here
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFBF1F",
        },
        headerTintColor: "#A35700",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 24,
          // fontFamily: "Quicksand-Regular",
        },
        tabBarActiveTintColor: "#A35700",
        tabBarInactiveTintColor: "#ffdab9",
        tabBarStyle: {
          backgroundColor: "#FFBF1F",
        },
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="explore" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
