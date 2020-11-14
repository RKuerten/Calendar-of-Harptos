import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Input, Icon } from "native-base";

import Colors from "../constants/Colors";
import Theme from "../utils/Theme";

const Searchbar = ({
  onChangeText = () => {},
  onClearText = () => {},
  value = "",
}) => (
  <View style={styles.inputStyle}>
    <Icon name="search" style={styles.iconsStyle} type="MaterialIcons" />
    <Input
      onChangeText={onChangeText}
      placeholder="Search Year by Name"
      placeholderTextColor={Colors.darkGray}
      style={styles.inputText}
      value={value}
    />
    {value.length > 0 && (
      <TouchableOpacity onPress={onClearText}>
        <Icon name="close" style={styles.iconsStyle} type="MaterialIcons" />
      </TouchableOpacity>
    )}
  </View>
);

export default Searchbar;

const styles = StyleSheet.create({
  iconsStyle: {
    color: Colors.darkGray,
    marginHorizontal: 5,
    fontSize: Theme.responsiveFontSize(25),
    textAlign: "center",
  },
  inputStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderColor: Colors.dayBorder,
    color: Colors.black,
    height: 65,
    padding: 10,
  },
  inputText: {
    fontFamily: "Roboto_medium",
  },
});
