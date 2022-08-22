import React, {useState, useEffect} from 'react';
import {
  Button,
  Appbar,
  Menu,
  MenuItem,
  Drawer,
  ToggleButton,
  IconButton,
  BottomNavigation,
} from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Keyboard,
  Pressable,
} from "react-native";
import { firebase } from "../firebase";
import * as Svg from "react-native-svg";
import { AnimatedCircularProgress } from "react-native-circular-progress";
// import { CircularProgress } from "react-native-circular-gradient-progress";

function HabitEmptyState({navigation, back}) {

const [visible, setVisible] = useState(false);
const [visibleOne, setVisibleOne] = useState(false);
const openMenu = () => setVisible(true);
const openMenuOne = () => setVisibleOne(true);
const closeMenu = () => setVisible(false);
const closeMenuOne = () => setVisibleOne(false);

const [goals, setGoals] = useState([]);
const goalRef = firebase.firestore().collection("goals");
const [addGoals, setAddGoals] = useState("");


const [status, setStatus] = useState("checked");
const [color, setColor] = useState("#0000FF");


const [statusOne, setStatusOne] = useState("checked");
const [colorOne, setColorOne] = useState("#0000FF");
const [active, setActive] = useState("");

const onButtonToggle = () => {
  setStatus(status === "checked" ? "unchecked" : "checked");
  setColor(color === "#0000FF" ? "#FFE2CD" : "#0000FF");
};

const onEditToggle = () => {
  setStatusOne(status === "checked" ? "unchecked" : "checked");
  setColorOne(colorOne === "#0000FF" ? "#FFE2CD" : "#0000FF");
};


//fetch or read the data from firebase
useEffect(() => {
  goalRef.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
    const goals = [];
    querySnapshot.forEach((doc) => {
      const { heading } = doc.data();
      goals.push({
        id: doc.id,
        heading,
      });
    });
    setGoals(goals);
  });
}, []);

const deleteGoal = (goals) => {
  goalRef
  .doc(goals.id)
  .delete()
  .then(() => {
    //show a successful alert
    alert("Deleted successfully");
  })
  .catch((error) => {
    alert(error);
  });
};

//circle animation/progress
const [fill, setFill] = useState(0);

   const onPlusToggle = () => {
     setFill(fill + 20);
   }

   const onMinusToggle = () => {
     setFill(fill - 20);
   }

   const checkDropdown = () => {
     return 
     
     
     <IconButton icon="check" size={50} 
     />;
     

   };


  return (
    <View style={{ backgroundColor: "#FFF1E7", flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: "#FFF1E7" }}>
        <Menu
          style={styles.menuOneContainer}
          visible={visibleOne}
          onDismiss={closeMenuOne}
          anchor={
            <Appbar.Action icon="menu" color="black" onPress={openMenuOne} />
          }
        >
          <Menu.Item icon="home" title="Home" />
          <Menu.Item icon="home" title="Stats" />
          <Menu.Item icon="home" title="Group" />
          <Menu.Item icon="home" title="Profile" />
        </Menu>
        <Appbar.Content title="CoHabit" />
        {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
        {!back ? (
          <Menu
            style={styles.doneButton}
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Appbar.Action
                icon="dots-vertical"
                color="black"
                onPress={openMenu}
              />
            }
          >
            <Menu.Item icon="pencil" onPress={onEditToggle} title="Edit" />
          </Menu>
        ) : null}
      </Appbar.Header>
      <FlatList
        data={goals}
        numColumns={1}
        renderItem={({ item }) => (
          <View>
            <Pressable style={styles.container}>
              {/* <IconButton
              icon='circle'
              onPress={() => deleteGoal(item)}
              style={styles.goalIcon}
            /> */}
              <View style={styles.innerContainer}>
                <View style={styles.twoContainer}>
                  <Text style={styles.itemHeading}>
                    {item.heading[0].toUpperCase() + item.heading.slice(1)}
                  </Text>
                  <ToggleButton
                    style={styles.editButton}
                    color={colorOne}
                    icon="pencil"
                    value="check"
                    status={statusOne}
                    onPress={() => navigation.navigate("Edit", { item })}
                  />
                </View>
                <AnimatedCircularProgress
                  style={styles.circularProgress}
                  rotation={0}
                  size={100}
                  width={10}
                  fill={fill}
                  tintColor="#006052"
                  onAnimationComplete={() => console.log("onAnimationComplete")}
                  backgroundColor="#D9D9D9"
                />
              </View>
              <View style={styles.twoContainer}>
                <ToggleButton
                  style={styles.minusButton}
                  icon="minus"
                  onPress={onMinusToggle}
                  size={30}
                  value="minus"
                  />
                <ToggleButton
                  style={styles.plusButton}
                  size={30}
                  onPress={onPlusToggle}
                  icon="plus"
                  value="plus"
                />
              </View>
            </Pressable>
          </View>
        )}
      />
      <Button
        style={styles.button}
        icon="plus"
        mode="contained"
        onPress={() => navigation.navigate("Home")}
        uppercase={false}
      >
        Add Habit
      </Button>
    </View>
  );
}

export default HabitEmptyState

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#006052',
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  circularProgress: {
    marginRight: 40,
  },
  twoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  minusButton: {
    marginRight: 90
  },

  container: {
    backgroundColor: "#FFE2CD",
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
  goalIcon: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14,
  },
  toggleButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 80,
    borderWidth: 5,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    height: 100,
    width: 100,
    marginRight: 50,
  },
  innerContainer: {
    alignItems: "center",
    marginLeft: 45,
  },
  itemHeading: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 20,
  },
  twoContainer: {
    flexDirection: "row",
  },
  editButton: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 40
  },
  menuOneContainer:{
    marginTop: 40,
    width: 300,
    height: 800,
  },
  doneButton: {
    marginTop: 40,
  }
  
});