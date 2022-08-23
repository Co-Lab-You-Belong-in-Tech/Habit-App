import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useAuthentication } from '../hook/useAuthentication';
import { getAuth} from 'firebase/auth';

const auth = getAuth();

export default function EditProfileScreen({navigation}) {
  const user = useAuthentication();
  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>
      <TouchableOpacity style={styles.buttonLogin} onPress={()=>navigation.navigate('Profile')} >
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
});