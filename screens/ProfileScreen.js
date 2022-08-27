import { View, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert, SafeAreaView, Image,
    Linking,} from 'react-native';
import { useAuthentication } from '../hook/useAuthentication';
import { getAuth, signOut } from 'firebase/auth';
import { Text } from 'react-native-paper';
import { firebase } from '../config/firebase';
import { useEffect, useState } from 'react';
import { Appbar, Button, ToggleButton, IconButton} from "react-native-paper";
import moment from 'moment';


export default function ProfileScreen({navigation}) {
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  console.log(uid);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState('')

  async function getUserInfo(){
    let doc = await firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .get();

    if (!doc.exists){
      Alert.alert('No user data found!')
    } else {
      let dataObj = doc.data();
      console.log(dataObj);
      setUserData(dataObj);
    }
  }

  useEffect(() => {
    getUserInfo();
    
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading])


  
  return (
    <SafeAreaView style={styles.container}>
        <Appbar.Header style={styles.header}>
            <Appbar.Action icon="menu" color="black" onPress={() => console.log("Pressed")}/> 
            <Appbar.Action icon="account" />
            <Appbar.Content style={{ fontSize: 15 }} title="Profile" />
            <Appbar.Action
            icon="dots-vertical"
            onPress={() => console.log("Pressed")}
            />
        </Appbar.Header>
        <View style={styles.editProfile}>
            <Button mode="text" onPress={() => navigation.navigate("EditProfile")}>Edit Profile</Button>
        </View>
        <View style={styles.profileBox}>
            <Image 
            source={{uri: userData ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}
            style={styles.profileImg}
            />
        </View>
        <View style={styles.textBoxOne}>
            <Text style={styles.userName}> {userData? userData.userName: ""}</Text>
        </View>
        <View style={styles.textBoxTwo}>
        <Text style={styles.email}> {userData? userData.email: user.email} </Text>

        </View>
        <View style={styles.textBoxThree}>
            <Text style={styles.date}>Joined {userData? moment(Date(userData.createdAt)).format('MMMM, YYYY'): null}</Text>
        </View>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FFF1E7',
  },
  header: {
      alignItems: 'center',
      backgroundColor: '#FFF1E7',
  },
  editProfile: {
      alignSelf: 'flex-end',
      paddingRight: 25,
  },
  profileText: {
      fontSize: 18,
      alignItems: 'center',
  },
  userName: {
      fontSize: 50, 
      justifyContent: 'center'
  },
  profileBox: {
      paddingLeft: 16,
      top: 96,
      position: 'absolute',

  },
  profileImg: {
      width: 56,
      height: 56,
      borderRadius: 52,
  }, 
  textBoxOne: {
      justifyContent: 'flex-start',
      paddingLeft: 15,
      top: 160,
      position: 'absolute'
  },
  userName: {
      fontSize: 16,
  },
  email: {
      fontSize: 12,
  },
  textBoxTwo: {
      justifyContent: 'flex-start',
      paddingLeft: 15,
      position: 'absolute',
      top: 194,
  },
  textBoxThree: {
    justifyContent: 'flex-start',
    paddingLeft: 15,
    position: 'absolute',
    top: 216,
},
date: {
    fontSize: 12,
}
});