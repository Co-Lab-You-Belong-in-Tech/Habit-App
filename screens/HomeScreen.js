import { View, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthentication } from '../hook/useAuthentication';
import { getAuth, signOut } from 'firebase/auth';
import { Text } from 'react-native-paper';
import { firebase } from '../config/firebase';
import { useEffect, useState } from 'react';

const auth = getAuth();

export default function HomeScreen() {
  const user = useAuthentication();

  console.log(user);
 if (!user) return null;
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
        <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>
      {/* <Text>Welcome {userName}!</Text> */}
    
      <TouchableOpacity onPress={() => signOut(auth)} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      
      <Text variant="displayMedium">Display Medium</Text>
    </View>

    </KeyboardAvoidingView>
  
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  inputContainer: {
    width: "80%",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonInputContainer: {},
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
});