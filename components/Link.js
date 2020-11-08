import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, Icon } from "native-base";

import Colors from "../constants/Colors";

const Link = ({
  direction = "ltr",
  fullColor,
  icon,
  iconStyle = {},
  label,
  labelStyle = {},
  onPress,
  style = {},
  type = "MaterialIcons",
}) => {
  return (
    <TouchableOpacity
      accessibilityLabel={label.toString()}
      onPress={onPress}
      style={[styles.buttonStyle(direction), style]}
    >
      {icon !== null && (
        <Icon
          name={icon}
          type={type}
          style={[
            styles.iconStyle(direction),
            iconStyle,
            fullColor ? { color: fullColor } : {},
          ]}
        />
      )}
      <Text
        style={[
          styles.textStyle,
          labelStyle,
          fullColor ? { color: fullColor } : {},
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Link;

const styles = StyleSheet.create({
  buttonStyle: (direction) => ({
    display: "flex",
    flexDirection: direction === "ltr" ? "row" : "row-reverse",
    alignItems: "center",
  }),
  iconStyle: (direction) => ({
    color: Colors.tintColor,
    fontSize: 24,
    marginLeft: direction === "ltr" ? 0 : 5,
    marginRight: direction === "ltr" ? 5 : 0,
  }),
  textStyle: {
    color: Colors.tintColor,
    fontWeight: "bold",
    fontSize: 14,
  },
});
