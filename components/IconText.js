import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "native-base";

import Colors from "../constants/Colors";

const IconText = ({
  direction = "ltr",
  fullColor,
  icon,
  iconStyle = {},
  label,
  labelStyle = {},
  style = {},
  type = "MaterialIcons",
}) => {
  return (
    <View
      accessibilityLabel={label.toString()}
      style={[styles.buttonStyle(direction), style]}
    >
      <Icon
        type={type}
        name={icon}
        style={[
          styles.iconStyle(direction),
          iconStyle,
          fullColor ? { color: fullColor } : {},
        ]}
      />
      <Text
        style={[
          styles.textStyle,
          labelStyle,
          fullColor ? { color: fullColor } : {},
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

export default IconText;

const styles = StyleSheet.create({
  buttonStyle: (direction) => ({
    display: "flex",
    flexDirection: direction === "ltr" ? "row" : "row-reverse",
    alignItems: "center",
  }),
  iconStyle: (direction) => ({
    color: Colors.black,
    fontSize: 24,
    marginLeft: direction === "ltr" ? 0 : 5,
    marginRight: direction === "ltr" ? 5 : 0,
  }),
  textStyle: {
    color: Colors.black,
    fontWeight: "bold",
    fontSize: 14,
  },
});
