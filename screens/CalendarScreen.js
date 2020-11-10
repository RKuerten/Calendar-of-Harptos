import React from "react";
import { StyleSheet, View } from "react-native";
import { FAB, Portal } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { Container } from "native-base";

import { CalendarSwitch, Content, Header, Month } from "../components";

class CalendarClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    let { isFocused, navigation } = this.props;
    let { open } = this.state;

    return (
      <Container>
        <Header
          navigation={navigation}
          title="The Year of the Phaerimm's Vengeance"
        />
        <Portal>
          <FAB.Group
            actions={[
              {
                icon: "copyright",
                label: "Créditos",
                onPress: () => navigation.navigate("Credits"),
              },
              {
                icon: "bell",
                label: "Remind",
                onPress: () => console.log("Pressed notifications"),
              },
            ]}
            icon="plus"
            open={open}
            onStateChange={() => this.setState({ open: !this.state.open })}
            visible={isFocused}
          />
        </Portal>
        <Content>
          <View style={styles.container}>
            <CalendarSwitch title="Year" />
            <CalendarSwitch title="Month" />
            <Month />
          </View>
        </Content>
      </Container>
    );
  }
}

export default function CalendarScreen(props) {
  const isFocused = useIsFocused();
  return <CalendarClass {...props} isFocused={isFocused} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
