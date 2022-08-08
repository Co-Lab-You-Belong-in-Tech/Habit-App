import { View, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useAuthentication } from '../hook/useAuthentication';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth();

export default function HomeScreen() {
  const user = useAuthentication();
  return (
    <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
        <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>
      <TouchableOpacity onPress={() => signOut(auth)} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
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