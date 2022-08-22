<<<<<<< HEAD
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import HabitEmptyState from "./screens/HabitEmptyState";
import { Provider as PaperProvider } from "react-native-paper";
import ProfileScreen from "./screens/ProfileScreen"
import EditProfileScreen from "./screens/EditProfileScreen"
=======
import React from 'react';
import './config/firebase';
import RootNavigation from './navigation';
>>>>>>> 2f6fd3470824b4213285032a836321615747b48e

// import { createDrawerNavigator } from "@react-navigation/drawer";

// const Drawer = createDrawerNavigator();

export default function App() {
<<<<<<< HEAD
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name = "EditProfile" component={EditProfileScreen}/>
          <Stack.Screen name = "Profile" component={ProfileScreen}/>
          <Stack.Screen name="Habit" component={HabitEmptyState} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
=======
  return ( 
    <RootNavigation />
  )
>>>>>>> 2f6fd3470824b4213285032a836321615747b48e
}



