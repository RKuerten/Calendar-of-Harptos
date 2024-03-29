import React from "react";
import PropTypes from "prop-types";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import Theme from "../utils/Theme";

/**
 * Header component.
 *
 * Displays the title of the page. On iOS, displays a back button if possible.
 */
export default class Header extends React.Component {
  static defaultProps = {
    /** Controls if the header show display a shadow or not. */
    hasShadow: true,
    /** Title of the header. */
    title: "Carregando...",
  };

  render() {
    let { hasShadow, navigation, title } = this.props;
    let index = navigation.canGoBack();

    return (
      <View style={[styles.header, hasShadow && styles.headerShadow]}>
        <View style={styles.column}>
          {Platform.OS === "ios" && index && (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons style={styles.headerIcon} name="arrow-back" />
            </TouchableOpacity>
          )}
          <Text style={styles.titleStyle}>{title}</Text>
        </View>
      </View>
    );
  }
}

Header.propTypes = {
  hasShadow: PropTypes.bool,
  title: PropTypes.string,
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
    padding: 5,
  },
  headerButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
  },
  headerIcon: {
    color: Colors.black,
    fontSize: Theme.responsiveFontSize(25),
  },
  titleStyle: {
    color: Colors.black,
    fontSize: Theme.responsiveFontSize(18),
    fontWeight: "bold",
    marginLeft: 5,
  },
});
