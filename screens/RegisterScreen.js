import {useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, KeyboardAvoidingView, TextInput, Pressable } from 'react-native';
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { FontAwesome5} from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import {useFonts} from "expo-font";
import { firebase } from '../config/firebase';

import { useTogglePasswordVisibility } from '../hook/useTogglePasswordVisibility';


const auth = getAuth();


function containsNumber(str) {
  return /[0-9]/.test(str);
}

const RegisterScreen = ({ navigation }) => {
  const { passwordVisibility, rightIcon, handlePasswordVisibility, visibilityText } =
    useTogglePasswordVisibility();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')
  const [validationMessage, setValidationMessage] = useState('');
  const userRef = firebase.firestore().collection('users');

  const addUserData = (cred)=>{
    if(userName && userName.length > 0){
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
   
      userRef.doc(cred.user.uid).set({
        userName: userName,
         createdAt: timestamp,
         email: cred.user.email,
         uid: cred.user.uid
       
       }).catch(error=>{alert(error)})
    }
  }


let validateAndSet = (value,setValue) => {
   setValue(value);
  }

// function checkPassword(firstpassword,secondpassword) {
//   if(firstpassword !== secondpassword){
//     setValidationMessage('Password do not match') 
//   }
//   else setValidationMessage('')
// }
  async function createAccount() {
    if (email === '' || password === '') {
      setValidationMessage('required filled missing')
    // }else if(password.length < 8 || containsNumber(password) === false){
    //   setValidationMessage('Password must contain 7 letters and 1 number')
    }else{
      setValidationMessage('')
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password).then((cred)=>{
        addUserData(cred);
      });
     } catch (error) {
      setValidationMessage(error.message);
    }
  }
  return (
      <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
        <View style={{ flexDirection: 'row'}}>
          <Text style={styles.headingText}>Create a CoHabit account</Text>
        </View>
        <View style={{ flexDirection: 'row'}}>
          <Text style={styles.subHeading}>Track, share, and maintain your goals with friends.</Text>
        </View>

        <View style={styles.inputContainer}>
          <View>
            <Text>Username</Text>
          <TextInput
            value={userName}
            onChangeText={(text) => setUserName(text)}
            style={styles.input}
          />
         </View>
          
          <View style={{marginTop: 16,}}>
            <Text>Email</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
          </View>
          <View style={{marginTop: 15,}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text>Password</Text>
              <Pressable onPress={handlePasswordVisibility} style={{ flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome name={rightIcon} size={24} color="black" />
                <Text style={{marginLeft: 8}}>{visibilityText}</Text>
              </Pressable>

            </View>
            <Text>Must contain 7 letters and 1 number</Text>
          
          <TextInput
            value={password}
            onChangeText={(value) => validateAndSet(value, setPassword)}
            style={styles.input}
            secureTextEntry={passwordVisibility}
          />
          </View>
          
         
          {/* <TextInput
          placeholder='confirm password'
          containerStyle={{marginTop:10}}
          value={confirmPassword}
          onChangeText={(value) => validateAndSet(value,setConfirmPassword)}
          secureTextEntry
          style={styles.input}
          onBlur={()=>checkPassword(password,confirmPassword)}
            />   */}
            {<Text style={styles.error}>{validationMessage}</Text>}
      
        </View>
  
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={createAccount} style={styles.buttonPrimary}>
            <Text style={styles.buttonPrimaryText}>Create Account</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.accountText}>Already have an account?</Text>
        </View>
         <View style={styles.loginButtonContainer}>
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
  marginTop: 16,
  marginLeft: 15,
  marginRight: 15,
}


  
});

export default RegisterScreen;