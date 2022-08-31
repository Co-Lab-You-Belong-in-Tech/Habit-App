import { View, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert, SafeAreaView, Image,
    Linking,} from 'react-native';
import { useAuthentication } from '../hook/useAuthentication';
import { getAuth, signOut } from 'firebase/auth';
import { Text } from 'react-native-paper';
import { firebase } from '../config/firebase';
import { useEffect, useState } from 'react';
import { Appbar, Button, ToggleButton, IconButton, Menu} from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';

const auth = getAuth();


export default function ProfileScreen({navigation}) {
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
// const user = useAuthentication();
  console.log(uid);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState('');

  const [visible, setVisible] = useState(false);
  const [visibleOne, setVisibleOne] = useState(false);
  const openMenu = () => setVisible(true);
  const openMenuOne = () => setVisibleOne(true);
  const closeMenu = () => setVisible(false);
  const closeMenuOne = () => setVisibleOne(false);

  function homeNav(){
    closeMenuOne()
    navigation.navigate("Home");
  }

  function habitNav(){
    closeMenuOne()
    navigation.navigate("Habit");
  }

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
        <Menu
            // style={styles.menuOneContainer}
            visible={visibleOne}
            onDismiss={closeMenuOne}
            anchor={
          <Appbar.Action icon="menu" color="black" onPress={openMenuOne} />
        }
      >
        <Menu.Item
            icon="home"
            title="Home"
            onPress={() => homeNav()}
          />
          <Menu.Item
            icon="plus-thick"
            title="Habit"
            onPress={() => habitNav()}
          />
        </Menu>
            
            <Appbar.Action icon="account" />
            <Appbar.Content style={{ fontSize: 15 }} title="Profile" />
            <Appbar.Action
            icon="dots-vertical"
            onPress={() => console.log("Pressed")}
            />
        </Appbar.Header>
          <View style={styles.editProfile}>
            <Button style={{fontFamily: "Poppins_Regular", fontSize: 12, lineHeight: 18,  }}mode="text" onPress={() => navigation.navigate("EditProfile")}>Edit Profile</Button>
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
            <MaterialCommunityIcons name="calendar-month" size={18} color="black" />
            <Text style={styles.date}>Joined {userData? moment(Date(userData.createdAt)).format('MMMM, YYYY'): null}</Text>
        </View>
        <View style={styles.textBoxFour}>
        <Button style={styles.button} icon="logout" mode="contained" onPress={() => signOut(auth)}>
          Logout
         </Button>

            
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
    position: 'absolute',
      alignSelf: 'flex-end',
      paddingRight: 25,
      top: 96,
      left: 230,
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
    fontFamily: 'Poppins_Medium',
      fontSize: 16,
      lineHeight: 24,
       color: "#002722",
  },
  email: {
      fontSize: 12,
      lineHeight: 18,
      fontFamily: 'Poppins_Regular',
  },
  textBoxTwo: {
      justifyContent: 'flex-start',
      paddingLeft: 15,
      position: 'absolute',
      top: 194,
  },
  textBoxThree: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    position: 'absolute',
    top: 216,
},
date: {
    fontSize: 12,
    fontFamily: 'Poppins_Regular',
    lineHeight: 18,
    marginLeft: 4,
},
button: {
    backgroundColor: "#006052",
    height: 50,
    marginTop: 100,
    
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  textBoxFour: {
    justifyContent: 'flex-start',
    paddingLeft: 15,
    position: 'absolute',
    top:160,
},
});