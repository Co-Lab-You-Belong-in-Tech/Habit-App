<<<<<<< HEAD
// import { View, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { useRef, useState } from 'react';
// import { register, useAuth, LogOut, logIn } from '../firebase'
=======
import { View, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Text, Pressable, Switch } from 'react-native';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useTogglePasswordVisibility } from '../hook/useTogglePasswordVisibility';
import { FontAwesome5} from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import {useFonts} from "expo-font";
>>>>>>> 2f6fd3470824b4213285032a836321615747b48e

const auth = getAuth();

<<<<<<< HEAD
// const LoginScreen = () => {
//     const [loading, setLoading] = useState('');

//     const currentUser = useAuth();


//     const emailRef = useRef('');
//     const passwordRef = useRef('');

//     async function handleSignUp() {
//       setLoading(true);
//       try {
//         await register(emailRef.current.value, passwordRef.current.value);
//       } catch {
//         alert('Error');
//       }
//       setLoading(false);
//     }
    
//     async function handleLogOut() {
//       setLoading(true);
//       try {
//         await LogOut();
//       } catch {
//         alert("Error")
//       }
//       setLoading(false);
//     }
    
    
//     async function handleLogIn() {
//       setLoading(true);
//       try {
//         await logIn(emailRef.current.value, passwordRef.current.value);
//       } catch {
//         alert("Error")
//       }
//       setLoading(false);
//     }

//   return (
//     <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
//       <View style={styles.inputContainer}>
//         <TextInput
//           placeholder="Email"
//           ref={emailRef}
//           style={styles.input}
//         />

//         <TextInput
//           placeholder="Password"
//           ref={passwordRef}
//           style={styles.input}
//           secureTextEntry
//         />
//       </View>

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity onPress={handleLogIn} style={styles.button}>
//           <Text style={styles.buttonText}>Login</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={handleSignUp}
//           style={[styles.button, styles.buttonOutline]}
//           disabled={loading || currentUser}
//           >
//           <Text style={styles.buttonOutlineText}>Register</Text>
//         </TouchableOpacity>  
//       </View>

//       <Text>
//         Currently logged in as: {currentUser?.email}
//       </Text>

//         <TouchableOpacity
//           onPress={handleLogOut}
//           disabled={loading || !currentUser}
//           style={[styles.button, styles.buttonOutline]}
//           >
//           <Text style={styles.buttonOutlineText}>Log Out</Text>
//         </TouchableOpacity>  
//     </KeyboardAvoidingView>
//   );
// }

// export default LoginScreen

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: "center",
//     alignItems: "center",
//     flex: 1,
//   },

//   input: {
//     backgroundColor: "white",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 10,
//     marginTop: 5,
//   },
//   inputContainer: {
//     width: "80%",
//   },
//   buttonOutline: {
//     backgroundColor: "white",
//     marginTop: 5,
//     borderColor: "#0782F9",
//     borderWidth: 2,
//   },
//   buttonOutlineText: {
//     color: "#0782F9",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: "#0782F9",
//     width: "100%",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   buttonContainer: {
//     width: "60%",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 40,
//   },
//   buttonInputContainer: {},
//   buttonText: {
//     color: "white",
//     fontWeight: "700",
//     fontSize: 16,
//   },
// });
=======
const LoginScreen = ({ navigation}) => {
  const { passwordVisibility, rightIcon, handlePasswordVisibility, visibilityText } =
    useTogglePasswordVisibility();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [validationMessage,setvalidationMessage] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = ()=> setIsEnabled(previousState => !previousState);
  
  async function login() {
    if (email === '' || password === '') {
      setvalidationMessage('required filled missing')
      return;
    }

    try {
      await signInWithEmailAndPassword(auth,email, password);
    } catch (error) {
     setvalidationMessage(error.message);
    }
  }
   

  return (
    <KeyboardAvoidingView style={styles.container} behavior={"padding"}>

        <View style={{ flexDirection: 'row'}}>
          <Text style={styles.headingText}>Log in to CoHabit</Text>
        </View>
      <View style={styles.inputContainer}>
        <View>
          <Text>Email</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
        </View>
        <View style={{marginTop: 15,}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Password</Text>
              <Pressable onPress={handlePasswordVisibility} style={{ flexDirection: 'row'}}>
                <FontAwesome name={rightIcon} size={24} color="black" />
                <Text style={{marginLeft: 8}}>{visibilityText}</Text>
              </Pressable>
            </View>
        </View>
            <Text>Must contain 7 letters and 1 number</Text>
     
        <View>
          <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={passwordVisibility}
          style={styles.input}
          />
        </View>
        
        
        {<Text style={styles.error}>{validationMessage}</Text>}

      </View>
      <View style={styles.rememberContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text>Remember me</Text>
            <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
      />

        </View>
      </View>
      <View style={styles.loginButtonContainer}>
         <TouchableOpacity style={styles.buttonLogin} onPress={login} >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
      </View>
      <View  style={styles.forgotPasswordContainer}>
        <Pressable>
          <Text>Forgot Password?</Text>
        </Pressable>
      </View>
      <View>
          <Text style={styles.accountText}>Don't have an account?</Text>
      </View>
      <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.buttonPrimary} onPress={()=>navigation.navigate('Sign Up')} >
            <Text style={styles.buttonPrimaryText}>Create Account</Text>
          </TouchableOpacity>
        </View>

      
     

        
    </KeyboardAvoidingView>
  );
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
  // height: 35.2,
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
  marginTop: 8,
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
  marginTop: 40,
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
  marginTop: 40,
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
},
loginButtonContainer: {
  marginLeft: 15,
  marginTop: 24,
  marginLeft: 15,
  marginRight: 15,
},
rememberContainer: {
  marginLeft: 15,
  marginTop: 24,
  marginLeft: 15,
  marginRight: 15,
 
},
forgotPasswordContainer: {
  alignItems: 'flex-end',
  marginEnd: 15,
  marginTop: 16,
}


  
});
export default LoginScreen;
>>>>>>> 2f6fd3470824b4213285032a836321615747b48e
