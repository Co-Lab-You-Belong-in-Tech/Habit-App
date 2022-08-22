import * as React from "react";
import { Drawer } from "react-native-paper";

const MyComponent = () => {
  const [active, setActive] = React.useState("");

  return (
    <Drawer.Section title="CoHabit">
      <Drawer.Item
        label="Home"
        active={active === "first"}
        onPress={() => setActive("first")}
      />
      <Drawer.Item
        label="Stats"
        active={active === "second"}
        onPress={() => setActive("second")}
      />
      <Drawer.Item
        label="Group"
        active={active === "third"}
        onPress={() => setActive("third")}
      />
      <Drawer.Item
        label="Profile"
        active={active === "fourth"}
        onPress={() => setActive("fourth")}
      />
    </Drawer.Section>
  );
};

export default MyComponent;
