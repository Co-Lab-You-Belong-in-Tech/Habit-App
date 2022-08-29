import React, {useState, useEffect, useContext, useRef} from 'react';
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


// const editNavigation = props.editNavigation;
// const updateGoal = props.updateGoal;

    const [fill, setFill] = useState(0);
    const [addFinishedCount, setAddFinishedCount] = useState(0);
    // const [fillPercent, setFillPercent] = useState(0);
    const prevAddFinihedCountRef = useRef();
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

// console.log("targetCount",item.targetCount);
// console.log("addcount", addFinishedCount);
// console.log(fillPercent + "%");

    //  const handleFill =()=>{
    //   let fillPercentage = ((addFinishedCount + 1) / item.targetCount) * 100;
    //   setFillPercent(fillPercentage)
    //     console.log(fillPercent + "%");
    //  }

    


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

      const handleFinishedCount = (item)=>{
        if (addFinishedCount <= item.targetCount  ) {
          goalRef
            .doc(item.id)
            .update({
              finishedCount: addFinishedCount,
            })
            .then(() => {
              // alert(`Updated Your ${item.heading} Progress`)
            })
            .catch((error) => {
              alert(error.message);
            });
          }
        }


        useEffect(() => {
       
         handleFinishedCount(item)
          prevAddFinihedCountRef.current = addFinishedCount;
        }, [addFinishedCount]);
      

    const onPlusToggle = () => {
       if(addFinishedCount < item.targetCount){
        setFill(fill + 1);
        setAddFinishedCount(addFinishedCount + 1)
       
        
       }
          
      
       
        }
      
        const onMinusToggle = () => {
          if(addFinishedCount > 0){
            setFill(fill - 1);
            setAddFinishedCount(addFinishedCount - 1)
           
          
           }
         
         
        
       
        }
    


    return (
        <View key={props.id} style={styles.container}>

          <View style={styles.innerContainer1}>
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
          <View style={styles.innerContainer2}>
              <CircularProgress style={styles.circularProgress}
                    // rotation={0}
                    size={100}
                    valuePrefix={item.targetCount}
                    valueSuffix={item.unit}
                    activeStrokeWidth={10}
                    value={addFinishedCount}
                    maxValue={item.targetCount}
                    inActiveStrokeColor={'red'}
                    radius={50}
                    inActiveStrokeOpacity={0.5}
                    
                    progressValueStyle={{ fontSize: 12, color: 'black' }}
                    tintColor="#006052"
                    onAnimationComplete={() => console.log("onAnimationComplete")}
                    backgroundColor="#D9D9D9"
                  />
          </View>
          <View style={styles.innerContainer3}>
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
  container: {
    backgroundColor: "#FFE2CD",
    // padding: 2,
    borderRadius: 8,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 20,
    width: 156,
    height: 168,
  },
  innerContainer1: {
    position: 'absolute',
    alignItems: "center",
   
    flexDirection: 'row',
    height: 30,
    marginTop: 6,
    marginBottom: 10,
    left: 0,
    top: 0,
  },
  innerContainer2: {
    position: 'absolute',
    alignItems: "center",
    
   
    left: 27,
    top: 40,
    height: 100,
  },
  circularProgress: {
    width: 100,
    height: 100,
   
  },
  innerContainer3: {
    alignItems: "center",
   
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    top: 140,
    height: 27,
    
  
  },
  deleteIcon:{

  },

  itemHeading:{
    width: 60,
    height: 16,
    marginLeft: 5,
    marginRight: 5,
   textAlign: 'center',
   fontSize: 12,
  },

  minusButton: {
    marginRight:70,
   marginLeft: 2,
   
  },
  plusButton: {
  
  //  marginLeft: 5,
   
  },
   
  });