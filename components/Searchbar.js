import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import Theme from "../utils/Theme";

const Searchbar = ({
  onChangeText = () => {},
  onClearText = () => {},
  value = "",
}) => (
  <View style={styles.inputWrapper}>
    <MaterialIcons name="search" style={styles.iconsStyle} />
    <TextInput
      onChangeText={onChangeText}
      placeholder="Search Year by Name or Value"
      placeholderTextColor={Colors.darkGray}
      style={styles.inputText}
      value={value}
    />
    {value.length > 0 && (
      <MaterialIcons
        name="close"
        style={styles.iconsStyle}
        onPress={onClearText}
      />
    )}
  </View>
);

Searchbar.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  onClearText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Searchbar;

const styles = StyleSheet.create({
  inputWrapper: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderColor: Colors.dayBorder,
    height: 65,
  },
  iconsStyle: {
    color: Colors.darkGray,
    marginHorizontal: 15,
    fontSize: Theme.responsiveFontSize(25),
    textAlign: "center",
  },
  inputText: {
    flex: 1,
    color: Colors.black,
    fontFamily: "Roboto_medium",
    fontSize: 17,
    paddingRight: 5,
  },
});
