import { pink, purple } from '@mui/material/colors';
import React from 'react';
//import { mdiCheckBold, mdiCloseThick} from '@mdi/js';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image,
} from 'react-native'
import { Appbar, Icons, TextInput} from 'react-native-paper';


const ProfileScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="close" color="red" onPress={() => console.log("Pressed")}/> 
                <Appbar.Action icon="account" />
                <Appbar.Content style={{ fontSize: 15 }} title="Edit Profile" />
                <Appbar.Action icon="check" color="green" onPress={() => console.log("Pressed")} />
            </Appbar.Header>
            <View style={styles.profileBox}>
                <Image 
                source={{uri: 'https://media.istockphoto.com/photos/pleasant-young-indian-woman-freelancer-consult-client-via-video-call-picture-id1300972573?k=20&m=1300972573&s=612x612&w=0&h=Tiwi8Y0q8FBg8nL0i5GL_GslELTVLKkEB2e6m63Jlcg='}}
                style={styles.profileImg}
                />
            </View>
            <View style={styles.textBox}>
                <TextInput mode="outlined" label="Username" right={<TextInput.Affix text="/100" />}/>
               <TextInput mode="outlined" label="Password" right={<TextInput.Affix text="/100" />}/>
            </View>
        </SafeAreaView>
    );
}

export default ProfileScreen;

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
        fontSize: 20, 
        justifyContent: 'center'
    },
    profileBox: {
        paddingLeft: 15
    },
    profileImg: {
        width: 75,
        height: 75,
        borderRadius: 200/2,
    }, 
    textBox: {
        justifyContent: 'center',
        paddingTop: 18

    },
    email: {
        fontSize: 16
    },
    calIcon: {
        paddingRight: 20,
        fontSize: 20
    },
    date: {
        alignItems: 'center'
    }
});