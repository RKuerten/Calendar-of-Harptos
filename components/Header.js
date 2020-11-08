import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "native-base";

import Colors from "../constants/Colors";
import Theme from "../utils/Theme";

export default class Header extends React.Component {
  render() {
    let { hasShadow, title } = this.props;

    return (
      <View style={[styles.header, hasShadow && styles.headerShadow]}>
        <View style={styles.column}>
          <Text style={styles.titleStyle}>{title}</Text>
        </View>
      </View>
    );
  }
}

Header.defaultProps = {
  hasShadow: true,
  title: "Carregando...",
};

const styles = StyleSheet.create({
  header: {
    height: 65,
    display: "flex",
    flexDirection: "row",
    alignContent: "space-between",
    backgroundColor: Colors.tintColor,
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  headerShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  column: {
    alignItems: "center",
    flexDirection: "row",
  },
  titleStyle: {
    color: Colors.black,
    fontSize: Theme.responsiveFontSize(18),
    fontWeight: "bold",
  }
});
