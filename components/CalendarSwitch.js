import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import Theme from "../utils/Theme";

export default class CalendarSwitch extends React.Component {
  static defaultProps = {
    onPressLeft: () => {},
    onPressRight: () => {},
    onPressText: null,
    title: "",
  };

  render() {
    let { onPressText, onPressLeft, onPressRight, title } = this.props;

    return (
      <View style={styles.baseSwitch}>
        <TouchableOpacity style={styles.switchButton} onPress={onPressLeft}>
          <MaterialIcons style={styles.switchIcon} name="chevron-left" />
        </TouchableOpacity>
        {onPressText != null ? (
          <TouchableOpacity onPress={onPressText}>
            <Text style={styles.switchText}>{title}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.switchText}>{title}</Text>
        )}
        <TouchableOpacity style={styles.switchButton} onPress={onPressRight}>
          <MaterialIcons style={styles.switchIcon} name="chevron-right" />
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
