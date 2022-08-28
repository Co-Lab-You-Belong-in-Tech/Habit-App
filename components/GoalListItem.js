import React, {useState, useEffect, useContext} from 'react';
import { useAuthentication } from '../hook/useAuthentication';
import { Button, Appbar, Menu, MenuItem, Drawer, ToggleButton, IconButton, TouchableOpacity} from "react-native-paper";
import { StyleSheet, Text, View, FlatList, TextInput, Keyboard, Pressable} from "react-native";
import { firebase } from "../config/firebase";
import { getAuth } from "firebase/auth";
import * as Svg from "react-native-svg";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import CircularProgress from 'react-native-circular-progress-indicator';
import { NavigationContainer, NavigationContext } from '@react-navigation/native';


const GoalListItem =(props)=>{
  const navigation = useContext(NavigationContext);

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  console.log(uid);


const item = props.item

console.log("goallist----", item);


const editNavigation = props.editNavigation;
const updateGoal = props.updateGoal;

    const [fill, setFill] = useState(0);
    const [colorOne, setColorOne] = useState("#0000FF");
    const [status, setStatus] = useState("checked");
    const [statusOne, setStatusOne] = useState("checked");
    const [colorTwo, setColorTwo] = useState("#000000");
    
    const onEditToggle = () => {
        setStatusOne(status === "checked" ? "unchecked" : "checked");
        setColorOne(colorOne === "#0000FF" ? "#FFE2CD" : "#0000FF");
      };

      const onDeleteToggle = () => {
        setStatus(status === "checked" ? "unchecked" : "checked");
        setColorTwo(colorTwo === "#000000" ? "#FFE2CD" : "#000000");
      };

      const goalRef = firebase.firestore().collection("goals");


     




      const deleteGoal = (item) => {
        
        goalRef
          .doc(item.id)
          .delete()
          .then(() => {
            //show a successful alert
            alert("Deleted successfully");
          })
          .catch((error) => {
            alert(error);
          });
      };
      

    const onPlusToggle = () => {
       
          setFill(fill + 1);
      
       
        }
      
        const onMinusToggle = () => {
         
         
          setFill(fill - 1);
       
        }
    


    return (
        <View key={props.id} style={styles.container}>
            <View style={styles.innerContainer}>
              <View style={styles.twoContainer}>
                  <ToggleButton
                    icon="delete-circle"
                    color={colorTwo}
                    value="check"
                    size={20}
                    status={status}
                    onPress={() => deleteGoal(item)}
                    style={styles.goalIcon}
                  />
                
                 <Text style={styles.itemHeading}>
                  {item.heading[0].toUpperCase() + item.heading.slice(1)}
                </Text>
                <ToggleButton
                  style={styles.editButton}
                  color={colorOne}
                  icon="pencil"
                  value="check"
                  status={statusOne}
                  onPress={() => navigation.navigate("Edit", {item}) }
                />
              </View>
              <View style={styles.circularProgress}>
                    <CircularProgress
                    // rotation={0}
                    size={100}
                    valuePrefix={item.targetCount}
                    valueSuffix={item.unit}
                    activeStrokeWidth={10}
                    value={fill}
                    radius={50}
                    
                    progressValueStyle={{ fontSize: 12, color: 'black' }}
                    tintColor="#006052"
                    onAnimationComplete={() => console.log("onAnimationComplete")}
                    backgroundColor="#D9D9D9"
                    />
              </View>
              
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
        </View>
    )

}

export default GoalListItem;

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
    circularFrequencyText: {

    },
    twoContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    minusButton: {
      marginRight: 90,
      // paddingBottom: 25,
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
      marginRight: 20,
      marginLeft: 5,
      // marginTop: 5,
      // fontSize: 20,
      // marginLeft: 14,
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
      marginLeft: 10,
    },
    twoContainer: {
      flexDirection: "row",
    
    },
    editButton: {
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 20,
      marginRight: 50,
    },
    menuOneContainer:{
      marginTop: 40,
      width: 300,
      height: 800,
    },
    doneButton: {
      marginTop: 40,
    },
    
  });