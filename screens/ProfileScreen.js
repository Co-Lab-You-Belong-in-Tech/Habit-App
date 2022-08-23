import { View, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert, SafeAreaView, Image,
    Linking,} from 'react-native';
import { useAuthentication } from '../hook/useAuthentication';
import { getAuth, signOut } from 'firebase/auth';
import { Text } from 'react-native-paper';
import { firebase } from '../config/firebase';
import { useEffect, useState } from 'react';
import { Appbar, Button, ToggleButton, IconButton} from "react-native-paper";
import moment from 'moment';
import { DATE_FORMAT } from 'react-native-gifted-chat';

export default function ProfileScreen({navigation}) {
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  console.log(uid);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState('')

  

  useEffect(() => {
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
    getUserInfo();
  }, [])


  
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
            source={{uri: 'https://media.istockphoto.com/photos/pleasant-young-indian-woman-freelancer-consult-client-via-video-call-picture-id1300972573?k=20&m=1300972573&s=612x612&w=0&h=Tiwi8Y0q8FBg8nL0i5GL_GslELTVLKkEB2e6m63Jlcg='}}
            style={styles.profileImg}
            />
        </View>
        <View style={styles.textBoxOne}>
            <Text style={styles.userName}> {userData.userName}</Text>
            <Text style={styles.email}> {userData.email} </Text>
        </View>
        <View style={styles.textBoxTwo}>
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
      paddingLeft: 15
  },
  profileImg: {
      width: 95,
      height: 95,
      borderRadius: 200/2,
  }, 
  textBoxOne: {
      justifyContent: 'flex-start',
      paddingLeft: 15,
      paddingTop: 20,
  },
  userName: {
      fontSize: 20,
  },
  email: {
      fontSize: 15
  },
  textBoxTwo: {
      justifyContent: 'flex-start',
      paddingLeft: 15,
      paddingTop: 1,
  }
});