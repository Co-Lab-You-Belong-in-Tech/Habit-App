import React, {useState} from 'react';
import { Button, Appbar, Menu, MenuItem} from "react-native-paper";
import {
  StyleSheet,
} from "react-native";



function HabitEmptyState({navigation, back}) {

const [visible, setVisible] = useState(false);
const openMenu = () => setVisible(true);
const closeMenu = () => setVisible(false);





  return (
    <>
      <Appbar.Header>
        {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
        {!back ? (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Appbar.Action icon="menu" color="white" onPress={openMenu} />
            }
          >
            <Menu.Item
              onPress={() => {
                console.log("Option 1 was pressed");
              }}
              title="Home"
            />
            <Menu.Item
              onPress={() => {
                console.log("Option 2 was pressed");
              }}
              title="Stats"
            />
            <Menu.Item
              onPress={() => {
                console.log("Option 3 was pressed");
              }}
              title="Group"
              disabled
            />
            <Menu.Item
              onPress={() => {
                console.log("Option 3 was pressed");
              }}
              title="Profile"
              disabled
            />
          </Menu>
        ) : null}
        <Appbar.Content title="CoHabit" />
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => console.log("Pressed")}
        />
      </Appbar.Header>
      <Button
        style={styles.button}
        icon="plus"
        mode="contained"
        onPress={() => navigation.navigate("Home")}
        uppercase={false}
      >
        Add Habit
      </Button>
    </>
  );
}

export default HabitEmptyState

const styles = StyleSheet.create({
button: {
   justifyContent: "center",
   alignItems: "center",
}

})