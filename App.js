import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import Home from "./screens/Home";
import AuthNavigator from "./screens/AuthStack";
import Reset from "./screens/Reset";
import EssentialDocsEntry from "./screens/EssentialDocsEntry";
import MedicineEntry from "./screens/MedicineEntry";
import TransitEntry from "./screens/TransitEntry";
import MustDoQuestionnaire from "./screens/MustDoQuestionnaire";
import MustDoList from "./screens/MustDoList";
import Details from "./screens/Details";

const Stack = createStackNavigator();
{/* <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        /> */}
export default function App() {
  return (
    <NavigationContainer>
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
          name="Reset"
          component={Reset}
          options={({ route }) => ({ title: route.params.headerTitle })}
        />
        <Stack.Screen
          name="Essential"
          component={EssentialDocsEntry}
          options={{ title: "Get Essential Gov Docs" }}
        />
        <Stack.Screen
          name="Medicine"
          component={MedicineEntry}
          options={{ title: "Understanding Healthcare" }}
        />
        <Stack.Screen
          name="Transit"
          component={TransitEntry}
          options={{ title: "Mastering Public Transit" }}
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
          }}
        />
        <Stack.Screen
          name="MustDoList"
          component={MustDoList}
          options={{
            title: "Your Must-Do List",
            headerBackVisible: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{ title: "Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
