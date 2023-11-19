import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import Home from "./screens/Home";
import AuthNavigator from "./screens/AuthStack";
import Reset from "./screens/Reset";
import EssentialDocsEntry from "./screens/EssentialDocsEntry";
import MedicineEntry from "./screens/MedicineEntry";
import TransitEntry from "./screens/TransitEntry";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Auth" component={AuthNavigator}/>
        <Stack.Screen name="Reset" component={Reset} options={({route})=> ({ title: route.params.headerTitle })}/>
        <Stack.Screen name="Essential" component={EssentialDocsEntry} options={{title: "Get Essential Gov Docs"}}/>
        <Stack.Screen name="Medicine" component={MedicineEntry} options={{title: "Understanding Healthcare"}}/>
        <Stack.Screen name="Transit" component={TransitEntry} options={{title: "Mastering Public Transit"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
