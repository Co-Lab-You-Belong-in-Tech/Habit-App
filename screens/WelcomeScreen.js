import { View, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Text, TextInput} from 'react-native';

import { FontAwesome5} from '@expo/vector-icons'; 
import {useFonts} from "expo-font";




export default function WelcomeScreen({navigation}) {

  const [loaded] = useFonts({
    Poppins_Bold: require('../assets/fonts/Poppins-Bold.ttf'),
    Poppins_Regular: require('../assets/fonts/Poppins-Regular.ttf'),
    Poppins_Medium: require('../assets/fonts/Poppins-Medium.ttf')
  });
  
  if (!loaded) {
    return null;
  }
   return(
    <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
        <View>
          <Text style={styles.headingText}>Join CoHabit</Text>
        </View>
        <View style={{ flexDirection: 'row'}}>
          <Text style={styles.subHeading}>Track, share, and accomplish your goals with friends.</Text>
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.input}>
          <FontAwesome5 name="google" size={24} color="black" />
          <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.input}>
            <FontAwesome5 name="facebook-square" size={24} color="blue" />
            <Text style={styles.buttonText}>Continue with facebook</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 34, marginBottom: 10, marginLeft: 15, marginRight: 15}}>
            <View style={{flex: 1, height: 1, backgroundColor: '#002722'}} />
            <View>
              <Text style={{width: 17, height: 24, color:'#002722', textAlign: 'center', fontFamily: 'Poppins_Medium'}}>or</Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor:'#002722'}} />
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.buttonPrimary} onPress={()=>navigation.navigate('Sign Up')} >
            <Text style={styles.buttonPrimaryText}>Create Account</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.accountText}>Already have an account?</Text>
        </View>
         <View style={styles.inputContainer}>
         <TouchableOpacity style={styles.buttonLogin} onPress={()=>navigation.navigate('Sign In')} >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
         </View>
          
        

    </KeyboardAvoidingView>
   )

}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFF1E7',
      // justifyContent: "center",
      // alignItems: "center",
      flex: 1,
  
    },
   headingText: {
    fontFamily: 'Poppins_Bold',
    height: 35,
    marginLeft: 15,
    marginTop: 40,
    color: "#006052",
    fontSize: 32,
    lineHeight: 35.2,
  },
  subHeading: {
    fontFamily: 'Poppins_Regular',
    fontSize: 18,
    lineHeight: 25.2,
    // height: 50,
    marginLeft: 15,
    marginTop: 10,
    color: "#002722",
    flexShrink: 1,
    flexWrap: 'wrap',
    flex: 1,
    flexGrow: 1,
  },
  input: {
    width: "auto",
    height: 56,
    marginTop: 16,
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "#002722",
    borderRadius: 8,
    alignItems:'center',
    flexDirection: "row",
    justifyContent: 'center',
  },
  buttonText: {
    height: 24,
    fontFamily: 'Poppins_Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#002722',
    paddingLeft: 5,
  },

  inputContainer: {
    marginLeft: 15,
    marginTop: 24,
    marginLeft: 15,
    marginRight: 15,
  },

  buttonPrimary: {
    height: 59,
    borderRadius: 8,
    alignItems:'center',
    flexDirection: "row",
    justifyContent: 'center',
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor:  '#006052',
    backgroundColor: '#006052',
    flexGrow: 1,
  },

  buttonPrimaryText: {
    fontFamily: 'Poppins_Medium',
    fontSize: 18,
    color: '#FFEAE0',
    lineHeight: 27,
  },
  accountText: {
    fontFamily: 'Poppins_Regular',
    fontSize: 18,
    lineHeight: 27,
    color: "#002722",
    marginTop: 90,
    marginLeft: 15,
  },

  buttonLogin: {
    height: 59,
    borderRadius: 8,
    alignItems:'center',
    flexDirection: "row",
    justifyContent: 'center',
    borderWidth: 1.5,
    borderStyle: "solid",
  },

  buttonLoginText: {
    fontFamily: 'Poppins_Medium',
    fontSize: 18,
    color: '#00342D',
    lineHeight: 27,

  }
    
  });