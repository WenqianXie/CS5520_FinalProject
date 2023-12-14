import React, { useRef } from "react";
import { Text } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import Home from "./screens/Home";
import AuthNavigator from "./screens/AuthStack";
import Reset from "./screens/Reset";
import EssentialDocsEntry from "./screens/EssentialDocsEntry";
import MedicineEntry from "./screens/MedicineEntry";
import TransitEntry from "./screens/TransitEntry";
import MustDoQuestionnaire from "./screens/MustDoQuestionnaire";
import MustDoList from "./screens/MustDoList";
import Details from "./screens/Details";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async function (notification) {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

const Stack = createStackNavigator();

export default function App() {
  const navigationRef = useRef();

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        navigationRef.current?.navigate("Details", {topic: response.notification.request.content.data.navigation})
      }
    );
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false, // Hides the back button title (screen name)
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Essential"
          component={EssentialDocsEntry}
          options={{
            title: "Get Essential Gov Docs",
            headerStyle: { backgroundColor: "#FFBF1F" },
          }}
        />
        <Stack.Screen
          name="Medicine"
          component={MedicineEntry}
          options={{
            title: "Understanding Healthcare",
            headerStyle: { backgroundColor: "#FFBF1F" },
          }}
        />
        <Stack.Screen
          name="Transit"
          component={TransitEntry}
          options={{
            title: "Mastering Public Transit",
            headerStyle: { backgroundColor: "#FFBF1F" },
          }}
        />
        <Stack.Screen
          name="MustDo"
          component={MustDoQuestionnaire}
          options={{
            title: "Get Your Must-Do List\nIn 5 Secs!",
            headerTitle: ({ style, children: title }) => {
              return (
                <Text style={style} numberOfLines={2}>
                  {title}
                </Text>
              );
            },
            headerStyle: { backgroundColor: "#FFBF1F" },
          }}
        />
        <Stack.Screen
          name="MustDoList"
          component={MustDoList}
          options={{
            title: "Your Must-Do List",
            headerBackVisible: false,
            headerLeft: () => null,
            headerStyle: { backgroundColor: "#FFBF1F" },
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: "Details",
            headerStyle: { backgroundColor: "#FFBF1F" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
