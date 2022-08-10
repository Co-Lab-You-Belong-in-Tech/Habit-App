import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Keyboard, Pressable} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { firebase } from '../firebase';
// import { useNavigation } from '@react-navigation/native';
import { Appbar, Button, Checkbox, IconButton } from "react-native-paper";

const HomeScreen = ({navigation}) => {
  const [goals, setGoals] = useState([]);
  const goalRef = firebase.firestore().collection('goals');
  const [addGoals, setAddGoals] = useState('');
  const [checked, setChecked] = useState(false);
  // const navigation = useNavigation();

  // const _goBack = () => navigation.navigate('HabitEmptyState');

  const _handleSearch = () => console.log("Searching");

  const _handleMore = () => console.log("Shown more");


  
  //fetch or read the data from firebase
  useEffect(() => {
      goalRef
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        querySnapshot => {
          const goals = [];
          querySnapshot.forEach((doc) => {
            const {heading} = doc.data();
            goals.push({
              id: doc.id,
              heading,
            })
          })
          setGoals(goals);
        }
      )
  }, [])

  //delete the goals from firestore db

  const deleteGoal = (goals) => {
    goalRef
    .doc(goals.id)
    .delete()
    .then(() => {
      //show a successful alert
      alert('Deleted successfully')
    })
    .catch(error => {
      alert(error);
    })
  }

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
      <FlatList
        data={goals}
        numColumns={1}
        renderItem={({ item }) => (
          <View>
            <Pressable
              style={styles.container}
              // onPress={() => navigation.navigate("DetailScreen", { item })}
            >
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked(!checked);
                }}
                />
              <IconButton
              icon='delete'
              onPress={() => deleteGoal(item)}
              style={styles.goalIcon}
              />
              <View style={styles.innerContainer}>
                <Text style={styles.itemHeading}>
                  {item.heading[0].toUpperCase() + item.heading.slice(1)}
                </Text>
              </View>
            </Pressable>
          </View>
        )}
      />
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
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "column",
    marginLeft: 45,
  },
  itemHeading: {
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 22,
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
  
});