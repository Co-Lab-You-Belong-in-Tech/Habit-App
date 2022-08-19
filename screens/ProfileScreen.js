
import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image,
    Linking,
} from 'react-native'
import { Appbar, Button } from 'react-native-paper';




const ProfileScreen = ({navigation}) => {
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
            <View style={styles.textBox}>
                <Text style={styles.userName}> @jhoxie </Text>
                <Text style={styles.email}> hoxie.julise@gmail.com </Text>
            </View>
                <Appbar.Action icon="calendar" />
         <View>
            <Text style={styles.date}>Joined August 2022 </Text>
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
        justifyContent: 'flex-start',
        paddingLeft: 15,
        paddingTop: 10,
    userName: {
        fontSize: 16,
    },
    email: {
        fontSize: 12
    },
    calendar: {
        flexDirection: "row"
    },
    calIcon: {
        paddingRight: 20
    },
    date: {
    }
}
});