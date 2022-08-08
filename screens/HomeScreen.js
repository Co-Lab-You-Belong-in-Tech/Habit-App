import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Keyboard, Pressable} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { firebase } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from "react-native-paper";

const HomeScreen = () => {
  const [goals, setGoals] = useState([]);
  const goalRef = firebase.firestore().collection('goals');
  const [addGoals, setAddGoals] = useState('');
  const navigation = useNavigation();

  const _goBack = () => console.log("Went back");

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
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Create a healthy habit" />
      </Appbar.Header>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add A New Goal"
          placeholderTextColor="#aaaaaa"
          onChangeText={(heading) => setAddGoals(heading)}
          value={addGoals}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={addGoal}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={goals}
        numColumns={1}
        renderItem={({ item }) => (
          <View>
            <Pressable
              style={styles.container}
              onPress={() => navigation.navigate("DetailScreen", { item })}
            >
              <FontAwesome
                name="trash-o"
                color="red"
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
  formContainer: {
    flexDirection: "row",
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 100,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#788eec",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
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
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});