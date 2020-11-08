import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "native-base";

import Colors from "../constants/Colors";

export default class Header extends React.Component {
  render() {
    let { title } = this.props;

    return (
      <View style={styles.header}>
        <Text>{title}</Text>
      </View>
    );
  }
}

Header.defaultProps = {
  title: "Carregando...",
};

const styles = StyleSheet.create({
  header: {
    height: 65,
    display: "flex",
    flexDirection: "row",
    alignContent: "space-between",
    backgroundColor: Colors.white,
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  column: {
    alignItems: "center",
    flexDirection: "row",
  },
});
