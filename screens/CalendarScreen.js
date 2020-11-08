import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FAB, Portal } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { Container } from "native-base";

import { Content, Header } from "../components";
import Colors from "../constants/Colors";

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
        <Header title="The Year of the Phaerimm's Vengeance" />
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
            <Text>Initial version</Text>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
