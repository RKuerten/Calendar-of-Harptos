import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "native-base";

import Colors from "../constants/Colors";
import Theme from "../utils/Theme";

export default class CalendarSwitch extends React.Component {
  static defaultProps = {
    onPressLeft: () => {},
    onPressRight: () => {},
    title: "",
  };

  render() {
    let { onPressLeft, onPressRight, title } = this.props;

    return (
      <View style={styles.baseSwitch}>
        <TouchableOpacity style={styles.switchButton} onPress={onPressLeft}>
          <Icon
            style={styles.switchIcon}
            type="MaterialIcons"
            name="chevron-left"
          />
        </TouchableOpacity>
        <Text style={styles.switchText}>{title}</Text>
        <TouchableOpacity style={styles.switchButton} onPress={onPressRight}>
          <Icon
            style={styles.switchIcon}
            type="MaterialIcons"
            name="chevron-right"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseSwitch: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    width: "100%",
  },
  switchButton: {
    paddingVertical: 10,
  },
  switchIcon: {
    color: Colors.black,
    fontSize: Theme.responsiveFontSize(25),
    textAlign: "center",
  },
  switchText: {
    color: Colors.black,
    fontSize: Theme.responsiveFontSize(18),
    fontWeight: "bold",
    paddingVertical: 10,
    textAlign: "center",
  },
});
