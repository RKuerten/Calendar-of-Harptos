import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DataTable, FAB, Portal } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { Container } from "native-base";

import { Content, Header } from "../components";
import Colors from "../constants/Colors";
import Theme from "../utils/Theme";

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
            <View style={styles.monthRow}>
              {Array.from(Array(10), (e, i) => i + 1).map(
                (day, key, { length }) => (
                  <View style={styles.dayBox(length - 1 === key)} key={key}>
                    <Text style={styles.dayText}>{day}</Text>
                  </View>
                )
              )}
            </View>
            <View style={styles.monthRow}>
              {Array.from(Array(10), (e, i) => i + 11).map(
                (day, key, { length }) => (
                  <View style={styles.dayBox(length - 1 === key)} key={key}>
                    <Text style={styles.dayText}>{day}</Text>
                  </View>
                )
              )}
            </View>
            <View style={styles.monthRow}>
              {Array.from(Array(10), (e, i) => i + 21).map(
                (day, key, { length }) => (
                  <View style={styles.dayBox(length - 1 === key)} key={key}>
                    <Text style={styles.dayText}>{day}</Text>
                  </View>
                )
              )}
            </View>
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
    padding: 20,
  },
  monthRow: {
    display: "flex",
    flexDirection: "row",
    borderColor: Colors.dayBorder,
    borderWidth: 1,
  },
  dayBox: (last) => ({
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.dayBorder,
    borderRightWidth: last ? 0 : 1,
    padding: Theme.relativeWidth(2),
  }),
  dayText: {
    color: Colors.black,
    fontSize: Theme.responsiveFontSize(16),
    width: Theme.responsiveFontSize(16) + 2,
    textAlign: "center",
  },
});
