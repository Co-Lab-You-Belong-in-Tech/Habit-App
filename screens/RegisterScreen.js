import {useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationMessage, setValidationMessage] = useState('')


let validateAndSet = (value,setValue) => {
   setValue(value);
  }

function checkPassword(firstpassword,secondpassword) {
  if(firstpassword !== secondpassword){
    setValidationMessage('Password do not match') 
  }
  else setValidationMessage('')
}
  async function createAccount() {
    email === '' || password === '' 
    ? setValidationMessage('required filled missing')
    : ''
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Sign In');
    } catch (error) {
      setValidationMessage(error.message);
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
            onChangeText={(value) => validateAndSet(value, setPassword)}
            style={styles.input}
            secureTextEntry
          />
          <TextInput
          placeholder='confirm password'
          containerStyle={{marginTop:10}}
          value={confirmPassword}
          onChangeText={(value) => validateAndSet(value,setConfirmPassword)}
          secureTextEntry
          style={styles.input}
          onBlur={()=>checkPassword(password,confirmPassword)}
            />  
            {<Text style={styles.error}>{validationMessage}</Text>}
      
        </View>
  
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={createAccount} style={styles.button}>
            <Text style={styles.buttonText}>SignUP</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{marginTop:5,fontSize:17}}>Already have an account?
          <TouchableOpacity onPress={()=>navigation.navigate('Sign In')} style={{color:'blue',marginLeft:10}}>
               <Text style={{marginLeft:5,fontSize:17,marginTop:8}}>Login here</Text> 
          </TouchableOpacity>
          </Text>
        </View>
         
      </KeyboardAvoidingView>
    )
    
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

export default RegisterScreen;