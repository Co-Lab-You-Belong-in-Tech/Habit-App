import { View, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

const LoginScreen = ({ navigation}) => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [validationMessage,setvalidationMessage] = useState('');
  
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
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
        {<Text style={styles.error}>{validationMessage}</Text>}

      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={login} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=>navigation.navigate('Sign Up')} 
          style={[styles.button, styles.buttonOutline]}
         
          >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>  
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

export default LoginScreen;