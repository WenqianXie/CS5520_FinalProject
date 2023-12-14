import { auth } from "../firebase/FirebaseSetup";
import React, { useState, useEffect } from "react";
import { Modal } from "react-native";
import { ExploreScreen } from "./ExploreScreen";
import { ProfileScreen } from "./ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { onAuthStateChanged } from "firebase/auth";
import WelcomeScreen from "./WelcomeScreen";

const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [modalHasShown, setModalHasShown] = useState(false);

  useEffect(() => {
    if (!modalHasShown) {
      setTimeout(() => {
        setModalVisible(false);
      }, 2000);
      setModalHasShown(true);
    }
  }, [modalHasShown]);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Quicksand-Regular": require("../assets/fonts/Quicksand-Bold.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  return (
    <>
      <Modal animationType="fade" visible={modalVisible}>
        <WelcomeScreen />
      </Modal>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FFBF1F",
          },
          headerTintColor: "#023047",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 24,
          },
          tabBarActiveTintColor: "#023047",
          tabBarInactiveTintColor: "#DAD7CD",
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
    </>
  );
}
