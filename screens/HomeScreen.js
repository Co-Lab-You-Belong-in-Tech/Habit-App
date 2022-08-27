import { StyleSheet, Text, View, FlatList, TextInput, Keyboard, Pressable} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { firebase } from '../config/firebase';
// import { useNavigation } from '@react-navigation/native';
import { Appbar, Button, ToggleButton, IconButton} from "react-native-paper";
import { useAuthentication } from '../hook/useAuthentication';

const HomeScreen = ({navigation}) => {
  const [goals, setGoals] = useState([]);
  const user = useAuthentication();
  const uid = user.uid;
  const goalRef =  firebase.firestore().collection('goals');
  const [addGoals, setAddGoals] = useState('');
  const [status, setStatus] = useState("checked");

  const onButtonToggle = (value) => {
    setStatus(status === "checked" ? "unchecked" : "checked");
  };

  //dropdown stuff
  const countries = ["day", "week", "month", "year"];
  const iconDropdown = () => {
    return (
      <IconButton
        icon="chevron-down"
        size={20}
      />
    );
  }
  
  //add a goal

  const addGoal = () => {
    //check if we have a goal written and its not a blank input
    if(addGoals && addGoals.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: addGoals,
        createdAt: timestamp,
        userId: uid,
      }
     goalRef
        .add(data)
        .then(() => {
          setAddGoals('');
          //release Keyboard
          Keyboard.dismiss();
          navigation.navigate('Habit')
        })
        .catch(error => {
          alert(error);
        })
  }
  navigation.navigate('Habit')
}

  return (
    <View style={{ backgroundColor: "#FFF1E7", flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: "#FFF1E7" }}>
        <Appbar.BackAction onPress={() => navigation.navigate("Habit")} />
        <Appbar.Content title="Create a healthy habit" />
      </Appbar.Header>
      <View style={styles.formContainer}>
        <Text style={styles.text}>Name your habit:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          onChangeText={(heading) => setAddGoals(heading)}
          value={addGoals}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.numberContainer}>
        <Text style={styles.text}>Set your goal for your habit:</Text>
        <View style={styles.twoContainer}>
          <TextInput
            style={styles.firstInput}
            placeholderTextColor="#aaaaaa"
            keyboardType="numeric"
            maxLength={10}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.secondInput}
            placeholderTextColor="black"
            placeholder="times"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </View>
      </View>
      <View style={styles.dropdownContainer}>
        <Text style={styles.textPer}>per</Text>
        <SelectDropdown
          renderDropdownIcon={iconDropdown}
          dropdownIconPosition="right"
          buttonStyle={styles.selectContainer}
          data={countries}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
      </View>
      <View style={styles.privateContainer}>
        <Text style={styles.textPrivate}>Private</Text>
        <Text style={styles.textSwitch}>
          <Switch
            color="#006052"
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
          />
        </Text>
      </View>
      <View style={styles.reminderContainer}>
        <Text style={styles.textReminder}>Reminders</Text>
        <View style={styles.offContainer}>
          <Text style={styles.textOff}>Off</Text>
          <IconButton
            icon="chevron-right"
            size={30}
            onPress={() => console.log("Pressed")}
          />
        </View>
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
  textPrivate: {
    justifyContent: "flex-start",
    marginRight: 290,
    marginLeft: 5,
    fontSize: 16,
  },
  textReminder: {
    marginRight: 250,
    marginLeft: 5,
    fontSize: 16,
  },
  offContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textOff: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
 },
  numberContainer: {
    flexDirection: "column",
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
  },
  input: {
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#FFF1E7",
    height: 60,
    borderRadius: 10,
    overflow: "hidden",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  textPer: {
    marginLeft: 20,
    marginRight: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#006052",
    height: 50,
    marginTop: 100,
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
  twoContainer: {
    flexDirection: "row",
  },
  dropdownContainer: {
    flexDirection: "row",
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    alignItems: "center",
  },
  privateContainer: {
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  reminderContainer: {
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  selectContainer: {
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#FFF1E7",
    height: 50,
    borderRadius: 10,
    overflow: "hidden",
    paddingLeft: 16,
    flex: 0.37,
    marginRight: 5,
  },
  offContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  firstInput: {
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#FFF1E7",
    height: 50,
    borderRadius: 10,
    overflow: "hidden",
    paddingLeft: 16,
    flex: 0.5,
    marginRight: 5,
  },
  secondInput: {
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#FFF1E7",
    height: 50,
    borderRadius: 10,
    overflow: "hidden",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
    marginLeft: 10,
  },
});