import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { useState} from "react";
import { firebase } from "../firebase";
import { Appbar, Button } from "react-native-paper";

const EditScreen = ({ navigation, route }) => {
  const goalRef = firebase.firestore().collection("goals");
  const [textHeading, onChangeHeadingText] = useState(route.params.item.name);

   const updateGoal = () => {
     if (textHeading && textHeading.length > 0) {
       goalRef
         .doc(route.params.item.id)
         .update({
           heading: textHeading,
         })
         .then(() => {
           navigation.navigate("Habit");
         })
         .catch((error) => {
           alert(error.message);
         });
     }
   };


  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate("Habit")} />
        <Appbar.Content title="Edit your habit" />
      </Appbar.Header>
      <View style={styles.formContainer}>
        <Text style={styles.text}>Name your habit</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeHeadingText}
          value={textHeading}
        />
      </View>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => {
          updateGoal();
        }}
        uppercase={false}
      >
        Save
      </Button>
    </View>
  );
};

export default EditScreen;

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
    width: "50%",
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
