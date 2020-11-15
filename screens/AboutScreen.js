import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Header } from "../components";
import Colors from "../constants/Colors";
import Theme from "../utils/Theme";

export default class AboutScreen extends React.Component {
  render() {
    let { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="About this App" />
        <View style={styles.innerContainer}>
          <Text selectable style={styles.text}>
            This app is your calendar tool to mark the passage of years in the
            Forgotten Realms.
            {"\n\n"}
            The years are counted using the Dalereckoning (DR) method, and the
            months and cycle of days represent the Calendar of Harptos, created
            by a wizard of the same name long ago.
            {"\n\n"}
            You'll also find the Roll of the Years here (from -700 DR to 1600
            DR), as written by Augathra the Mad, a Netherese scholar.
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
    fontSize: Theme.responsiveFontSize(16),
    lineHeight: Theme.responsiveFontSize(16) + 4,
  },
});
