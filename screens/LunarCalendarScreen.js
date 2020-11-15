import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Header } from "../components";
import Colors from "../constants/Colors";
import Theme from "../utils/Theme";

export default class LunarCalendarScreen extends React.Component {
  render() {
    let { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="LunarCalendar" />
        <View style={styles.innerContainer}>
          <Text style={styles.text}>
            Forgotten Realms is a trademark of Wizards of the Coast, Inc., a
            subsidiary of Hasbro, Inc. All Rights Reserved.
            {"\n\n"}
            Source code is © 2020 by Rodrigo Kuerten.
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
  },
  text: {
    color: Colors.black,
    fontFamily: "Roboto_medium",
    fontSize: Theme.responsiveFontSize(15),
  },
});
