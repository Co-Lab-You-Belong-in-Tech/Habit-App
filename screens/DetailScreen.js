<<<<<<< HEAD
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { firebase } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const Detail = ({route}) => {
    const goalRef = firebase.firestore().collection("goals");
    const [textHeading, onChangeHeadingText] = useState(route.params.item.name);
    const navigation = useNavigation();
  
    const updateGoal = () => {
        if(textHeading && textHeading.length > 0) {
            goalRef
            .doc(route.params.item.id)
            .update({
                heading: textHeading
            }).then (() => {
                navigation.navigate('HomeScreen')
            }).catch ((error) => {
                alert(error.message)
            })
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textField}
                onChangeText={onChangeHeadingText}
                value={textHeading}
                placeholder='Update Goal'
            />
            <Pressable
                style={styles.buttonUpdate}
                onPress={() => {updateGoal()}}
            >
                <Text>UPDATE GOAL</Text>
            </Pressable>
        </View>
    )

}

export default Detail

const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        marginLeft: 15,
        marginRight: 15,
    },
    textField: {
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        color: '#000000',
        backgroundColor: '#e5e5e5',
        borderRadius: 5,
    },
    buttonUpdate: {
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 32,
        elevation: 10,
        backgroundColor: '#0de065'
    }
})
=======
import * as React from "react";
import { Drawer } from "react-native-paper";

const MyComponent = () => {
  const [active, setActive] = React.useState("");

  return (
    <Drawer.Section title="CoHabit">
      <Drawer.Item
        label="Home"
        active={active === "first"}
        onPress={() => setActive("first")}
      />
      <Drawer.Item
        label="Stats"
        active={active === "second"}
        onPress={() => setActive("second")}
      />
      <Drawer.Item
        label="Group"
        active={active === "third"}
        onPress={() => setActive("third")}
      />
      <Drawer.Item
        label="Profile"
        active={active === "fourth"}
        onPress={() => setActive("fourth")}
      />
    </Drawer.Section>
  );
};

export default MyComponent;
>>>>>>> 2f6fd3470824b4213285032a836321615747b48e
