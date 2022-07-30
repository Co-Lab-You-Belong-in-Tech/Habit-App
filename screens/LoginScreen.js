import { View, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRef } from 'react';
import { register } from '../firebase'


const LoginScreen = () => {

    const emailRef = useRef('');
    const passwordRef = useRef('');

    async function handleSignUp() {
      await register(emailRef.current.value, passwordRef.current.value);
    }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          ref={emailRef}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          ref={passwordRef}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
          >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>  
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen

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
});