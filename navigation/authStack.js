import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import WelcomeScreen from '../Screens/WelcomeScreen';
import {StyleSheet} from 'react-native';

const Stack = createStackNavigator();



export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
     
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFF1E7',
            shadowColor: '#FFF1E7',
            elevation: 0,
            height: 56,
          },
          // headerBackTitleVisible: false,
          // headerBackImage: ()=>(<FontAwesome5 name="arrow-left"  size={24} color="black" />),
          // headerLeftContainerStyle: styles.headerBackImageStyle,
      }}>
        <Stack.Screen name="Welcome"  options={{headerShown: false}}component={WelcomeScreen} />
        <Stack.Screen name="Sign In" options={{title: ''} } component={LoginScreen} />
        <Stack.Screen name="Sign Up" options={{title: ''} } component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerBackImageStyle: {
    left: 14,
    marginTop: 16,
    marginBottom: 16,
    width: 40,
    height: 24,
   
  }
})