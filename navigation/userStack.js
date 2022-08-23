import React from 'react';
import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import HabitEmptyState from '../Screens/HabitEmptyState';
import EditScreen from '../Screens/EditScreen';
import DetailScreen from '../Screens/DetailScreen';
import HomeScreen from '../Screens/HomeScreen';
import { Provider as PaperProvider } from "react-native-paper";
import ProfileScreen from '../Screens/ProfileScreen';
import EditProfileScreen from '../Screens/EditProfileScreen';



const Stack = createStackNavigator();

export default function UserStack() {

 

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="Habit" component={HabitEmptyState} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Edit" component={EditScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}