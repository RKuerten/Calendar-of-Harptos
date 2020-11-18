import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Header } from "../components";
import Colors from "../constants/Colors";
import Theme from "../utils/Theme";

export default class CreditsScreen extends React.Component {
  render() {
    let { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="Credits" />
        <View style={styles.innerContainer}>
          <Text selectable style={styles.text}>
            Calendar of Harptos is unofficial Fan Content permitted under the
            Fan Content Policy. Not approved/endorsed by Wizards. Portions of
            the materials used are property of Wizards of the Coast. ©Wizards of
            the Coast LLC.
            {"\n\n"}
            Design and source code are © 2020 by Rodrigo Kuerten.
            {"\n\n"}
            Icon artwork by Enrico Tomasetti.
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
  },
});
