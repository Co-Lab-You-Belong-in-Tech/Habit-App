// import { View, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { useRef, useState } from 'react';
// import { register, useAuth, LogOut, logIn } from '../firebase'


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