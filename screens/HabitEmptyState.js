import React, {useState, useEffect} from 'react';
import { useAuthentication } from '../hook/useAuthentication';
import { Button, Appbar, Menu, MenuItem, Drawer, ToggleButton, IconButton, TouchableOpacity} from "react-native-paper";
import { StyleSheet, Text, View, FlatList, TextInput, Keyboard, Pressable} from "react-native";
import { firebase } from "../config/firebase";
import { getAuth } from "firebase/auth";
import * as Svg from "react-native-svg";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import CircularProgress from 'react-native-circular-progress-indicator';
import GoalListItem from '../components/GoalListItem';

const HabitEmptyState = ({navigation, back}) => {

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  console.log(uid);
  const goalRef = firebase.firestore().collection("goals");

  

  // const [fill, setFill] = useState(0);
  
  const [plusValue, setPlusValue] = useState(0);
  const [minusValue, setMinusValue] = useState(0);
  const [visible, setVisible] = useState(false);
  const [visibleOne, setVisibleOne] = useState(false);
  const openMenu = () => setVisible(true);
  const openMenuOne = () => setVisibleOne(true);
  const closeMenu = () => setVisible(false);
  const closeMenuOne = () => setVisibleOne(false);

  const [goals, setGoals] = useState([]);
  const [addGoals, setAddGoals] = useState("");
  const [statusOne, setStatusOne] = useState("checked");

  const [selectedId, setSelectedId] = useState(null);
  
  const [color, setColor] = useState("#0000FF");
  const [status, setStatus] = useState("checked");
  const [colorOne, setColorOne] = useState("#0000FF");
  const [colorTwo, setColorTwo] = useState("#000000");

  const [active, setActive] = useState("");
  

  const onDeleteToggle = () => {
    setStatus(status === "checked" ? "unchecked" : "checked");
    setColorTwo(colorTwo === "#000000" ? "#FFE2CD" : "#000000");
  };

  const onButtonToggle = (item) => {
   
    setStatus(status === "checked" ? "unchecked" : "checked");
    setColor(color === "#0000FF" ? "#FFE2CD" : "#0000FF");
  };

  const onEditToggle = (item) => {
    setSelectedId(item);
    
    setStatusOne(status === "checked" ? "unchecked" : "checked");
    setColorOne(colorOne === "#0000FF" ? "#FFE2CD" : "#0000FF");
  };

function navigateToEditPage(item){
  navigation.navigate("Edit", {item})
}


function homeNav(){
  closeMenuOne()
  navigation.navigate("Home");
}
function profileNav(){
  closeMenuOne()
  navigation.navigate("Profile");
}


  // const getItem = (item) => {
  //   //Function for click on an item
  //   setSelectedId(item)
  //   alert('Id : ' + item.id + ' count : ' + item.targetCount);
  // };
  
  // const getLog = (item) => {
  //   setFill(fill - 20);
  //   //Function for click on an item
  //   // alert('LogMe : ' + item.id + ' Name : ' + item.heading);
  // };

  //  circle animation/progress



 



  const checkDropdown = () => {
  return <IconButton icon="check" size={50} />;
  
  };


   //fetch or read the data from firebase
   useEffect(() => {
 
    const goalRef = firebase.firestore().collection("goals").where("userId", "==", uid)
    const unsubscribe = goalRef.onSnapshot((querySnapshot) => {
    const goals = [];
    querySnapshot.forEach((doc) => {
      const { heading, targetCount, unit, frequency, createdAt, finishedCount  } = doc.data();
      goals.push({
        id: doc.id,
        heading,
        targetCount,
        unit,
        frequency,
        finishedCount,
        createdAt,
      });
    });
    setGoals(goals);
   
  });
  return unsubscribe;
  }, []);
  // console.log("item1.id", goals[0].id);

 

  return(
    <View style={{ backgroundColor:  "#FFF1E7", flex: 1 }}>
    <Appbar.Header style={{ backgroundColor: "#FFF1E7" }}>
      <Menu
        style={styles.menuOneContainer}
        visible={visibleOne}
        onDismiss={closeMenuOne}
        anchor={
          <Appbar.Action icon="menu" color="black" onPress={openMenuOne} />
        }
      >
        <Menu.Item
            icon="home"
            title="Home"
            onPress={() => homeNav()}
          />
          <Menu.Item
            icon="account"
            title="Profile"
            onPress={() => profileNav()}
          />
          {/* <Menu.Item
            icon="login"
            title="Login"
            onPress={() => navigation.navigate("Welcome")}
          /> */}
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
          <Menu.Item
              icon="pencil"
              onPress={onEditToggle}
              color="black"
              title="Edit"
            />
            <Menu.Item
              icon="delete"
              onPress={onDeleteToggle}
              color="black"
              title="Delete"
            />
          </Menu>
        ) : null}
    </Appbar.Header>
    <FlatList
      data={goals}
      numColumns={2}
      renderItem={({ item }) => (
        <GoalListItem item={item} editNavigation={navigateToEditPage} />
      )}
      keyExtractor={item => item.id}
      extraData={selectedId}
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
  )};

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
  // itemHeading: {
  //   fontWeight: "bold",
  //   fontSize: 18,
  //   marginLeft: 20,
  // },
  twoContainer: {
    flexDirection: "row",
    alignItems: 'center'
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