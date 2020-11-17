import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import Theme from "../utils/Theme";

export default class CalendarSwitch extends React.Component {
  static defaultProps = {
    leftLabel: "Minus 1",
    rightLabel: "Plus 1",
    onPressLeft: () => {},
    onPressRight: () => {},
    onPressText: null,
    title: "",
  };

  render() {
    let {
      leftLabel,
      rightLabel,
      onPressText,
      onPressLeft,
      onPressRight,
      title,
    } = this.props;

    return (
      <View style={styles.baseSwitch}>
        <TouchableOpacity
          accessibilityLabel={leftLabel}
          style={styles.switchButton}
          onPress={onPressLeft}
        >
          <MaterialIcons style={styles.switchIcon} name="chevron-left" />
        </TouchableOpacity>
        {onPressText != null ? (
          <TouchableOpacity onPress={onPressText}>
            <Text style={styles.switchText}>{title}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.switchText}>{title}</Text>
        )}
        <TouchableOpacity
          accessibilityLabel={rightLabel}
          style={styles.switchButton}
          onPress={onPressRight}
        >
          <MaterialIcons style={styles.switchIcon} name="chevron-right" />
        </TouchableOpacity>
      </View>
    );
  }
}

CalendarSwitch.propTypes = {
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  onPressText: PropTypes.func,
  title: PropTypes.string,
};

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
