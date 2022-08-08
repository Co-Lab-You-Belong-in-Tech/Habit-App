import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import DetailScreen from './Screens/HomeScreen';
import { useNavigation } from "@react-navigation/native";
import { Provider as PaperProvider } from 'react-native-paper';


const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        {/* <Stack.Screen
          options={{ headerShown: false }}
          name="Detail"
          component={DetailScreen}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}


