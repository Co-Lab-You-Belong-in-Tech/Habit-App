import { StyleSheet, Text, View, FlatList, TextInput, Keyboard, Pressable} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { firebase } from '../firebase';
// import { useNavigation } from '@react-navigation/native';
import { Appbar, Button, ToggleButton, IconButton} from "react-native-paper";

const HomeScreen = ({navigation}) => {
  const [goals, setGoals] = useState([]);
  const goalRef = firebase.firestore().collection('goals');
  const [addGoals, setAddGoals] = useState('');
  const [status, setStatus] = useState("checked");

  const onButtonToggle = (value) => {
    setStatus(status === "checked" ? "unchecked" : "checked");
  };
  
  //add a goal

  const addGoal = () => {
    //check if we have a goal written and its not a blank input
    if(addGoals && addGoals.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: addGoals,
        createdAt: timestamp
      };
      goalRef
        .add(data)
        .then(() => {
          setAddGoals('');
          //release Keyboard
          Keyboard.dismiss();
        })
        .catch(error => {
          alert(error);
        })
  }
  navigation.navigate('Habit')
}

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate("Habit")} />
        <Appbar.Content title="Create a healthy habit" />
      </Appbar.Header>
      <View style={styles.formContainer}>
        <Text style={styles.text}>Name your habit</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          onChangeText={(heading) => setAddGoals(heading)}
          value={addGoals}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </View>
      <Button
        style={styles.button}
        mode="contained"
        onPress={addGoal}
        uppercase={false}
      >
        Create Habit
      </Button>
    </View>
  );

}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5e5e5",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
    width: '50%',
    height: 200,
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "column",
    marginLeft: 45,
  },
  itemHeading: {
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 50,

  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },

  formContainer: {
    flexDirection: "column",
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
  },
  input: {
    height: 60,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 50,
    marginTop: 420,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  goalIcon: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14,
  },
  toggleButton: {
    justifyContent: "center",
    alignItems: "center",
   borderRadius: 100,
   height: 120,
   width: 120,
   marginRight: 50,
   marginTop: 15,
  },
 
  
  
});