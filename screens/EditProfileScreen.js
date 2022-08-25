import { View, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert, SafeAreaView, Image, ImageBackground, TextInput,
  Linking,} from 'react-native';
import { useAuthentication } from '../hook/useAuthentication';
import { getAuth, signOut } from 'firebase/auth';
import { Text } from 'react-native-paper';
import { firebase } from '../config/firebase';
import React,{ useEffect, useState } from 'react';
import { Appbar, Button, ToggleButton, IconButton} from "react-native-paper";
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
// import Animated from 'react-native-reanimated';
import { BottomSheet } from "react-native-btr";
import { FontAwesome5} from '@expo/vector-icons'; 
import uuid from 'react-native-uuid';




const auth = getAuth();

export default function EditProfileScreen({navigation}) {

  const fetchFonts = () => {
    return Font.loadAsync({
        Poppins_Bold: require('../assets/fonts/Poppins-Bold.ttf'),
        Poppins_Regular: require('../assets/fonts/Poppins-Regular.ttf'),
        Poppins_Medium: require('../assets/fonts/Poppins-Medium.ttf')
    })};


 
const [fontsLoaded, setFontsLoaded] = useState(false);


   
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  console.log(uid);
 
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [visible, setVisible] = useState(false);

  // bottomsheet toggle function
  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

  // function to fetch usr info from firestore
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
  }, []);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onError={console.warn}
        onFinish={() => setFontsLoaded(true)}
      />
    );
  }



  // function to save all updates to firestore user document
  const handleUpdate = async() => {
    let imgUrl = await handleImagePicked();
    console.log("imgUrlFinal", imgUrl);

    if( imgUrl == null && userData.userImg ) {
      imgUrl = userData.userImg;
    }

    firebase.firestore()
    .collection('users')
    .doc(uid)
    .update({
      userName: userData.userName,
      email: userData.email,
      userImg: imgUrl,
    })
    .then(() => {
      console.log('User Updated!');
      Alert.alert(
        'Profile Updated!',
        'Your profile has been updated successfully.'
      );
      navigation.navigate('Profile');
    })
  }
      
  // Image Picker function
    const pickImage = async () => {
    // No permissions request is necessary for launching the image library
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })
    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
      toggleBottomNavigationView();
    }
      };


      // function to call the uploadimage function
      handleImagePicked = async () => {
        try {
            setUploading(true)
            const uploadUrl = await uploadImage(image);
            setUploading(false);
            console.log("uploadUrl", uploadUrl);
            return uploadUrl;
        } catch (e) {
          console.log(e);
          alert("Upload failed, sorry :(");
        } 
      };
    
    
      // call back function to upload image to firebase Storage
      async function uploadImage(image) {
        if( image == null ) {
          return null;
        }
      
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response); // when BlobModule finishes reading, resolve with the blob
         };
         xhr.onerror = function() {
           reject(new TypeError('Network request failed')); // error occurred, rejecting
         };
         xhr.responseType = 'blob'; // use BlobModule's UriHandler
         xhr.open('GET', image, true); // fetch the blob from uri in async mode
         xhr.send(null); // no initial data
        });
      
        // do something with the blob, eg. upload it to firebase (API v5.6.0 below)
        const ref = firebase
          .storage()
          .ref()
          .child(uuid.v4());

        const snapshot = await ref.put(blob);
        const remoteUri = await snapshot.ref.getDownloadURL();
      
        // when we're done sending it, close and release the blob
        blob.close();
        
        // return the result, eg. remote URI to the image
        return remoteUri;
      }
  
  return (
    <SafeAreaView style={styles.container}>
        <Appbar.Header style={styles.header}>
            <Appbar.Action icon="close" color="black" onPress={() => navigation.navigate('Profile')}/> 
            <Appbar.Action icon="account" />
            <Appbar.Content style={{ fontSize: 15 }} title="Edit Profile" />
            <Appbar.Action
            icon="check"
            onPress={handleUpdate}
            />
        </Appbar.Header>
        <View>
        <BottomSheet
         visible={visible}
         //setting the visibility state of the bottom shee
         onBackButtonPress={toggleBottomNavigationView}
         //Toggling the visibility state on the click of the back botton
         onBackdropPress={toggleBottomNavigationView}
         //Toggling the visibility state on the clicking out side of the sheet
       > 
       <View style={styles.bottomNavigationView}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
            
              <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      
      <TouchableOpacity
        style={styles.panelButton}
        onPress={pickImage}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={toggleBottomNavigationView}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
      
    </View>
                
              </View>
            </View>
          </View>
        </BottomSheet>   

        </View>
        
 
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={toggleBottomNavigationView}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{uri: image ? image : userData
                    ? userData.userImg ||
                      'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                    : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                }}
                style={{height: 100, width: 100}}
                imageStyle={{width: 95,
                  height: 95,
                  borderRadius: 200/2,}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesome5
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          </View>
        {/* <View style={styles.textBoxOne}>
            <Text style={styles.userName}> {userData.userName}</Text>
            <Text style={styles.email}> {userData.email} </Text>
        </View> */}
        {/* edit section */}
        <View>
        <View style={styles.editUsernameContainer}>
            <Text style={styles.labelText}>Username</Text>
          <TextInput
             autoCorrect={false}
             value={userData ? userData.userName : ''}
             onChangeText={(txt) => setUserData({...userData, userName: txt})}
             style={styles.inputText}
          />
         </View>
         <View style={styles.editEmailContainer}>
            <Text style={styles.labelText}>Email</Text>
            <TextInput
                 autoCorrect={false}
                 value={userData ? userData.email : ''}
                 onChangeText={(txt) => setUserData({...userData, userName: txt})}
                 style={styles.inputText}
            />
         </View>

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
      position: 'absolute',
      width: 56,
      height: 56,
      left: 16,
      top: 96,
   
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
  },
  editUsernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 16,
    
    position: 'absolute',
    width: 360,
    height: 49,
    left: 0,
    top: 168,
    borderBottomColor: '#BDBCBC',
    borderBottomWidth: .5,
    borderStyle: 'solid',
  },
  labelText: {
    fontFamily: 'Poppins_Medium',
    fontSize: 16,
    lineHeight: 22.4,
    color: '#002722',
    flexGrow: 0,
  },
  editEmailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
   
    
    position: 'absolute',
   width: 'auto',
    height: 49,
    left: 0,
    top: 217,
    borderBottomColor: '#BDBCBC',
    borderBottomWidth: .5,
    borderStyle: 'solid',
   
    
  },
  labelText: {
    fontFamily: 'Poppins_Medium',
    fontSize: 16,
    marginRight: 40,
    lineHeight: 22.4,
    color: '#002722',
    flexGrow: 0,
  },
  inputText: {
    width: 135,
    height: 18,
    fontFamily: 'Poppins_Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#414141',
    flexGrow: 0,

  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    width: '100%',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#2e64e5',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
});