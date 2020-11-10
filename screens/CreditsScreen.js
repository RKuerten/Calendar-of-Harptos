import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Container } from "native-base";

import { Content, Header } from "../components";
import Colors from "../constants/Colors";
import Theme from "../utils/Theme";

export default class CreditsScreen extends React.Component {
  render() {
    let { navigation } = this.props;

    return (
      <Container>
        <Header navigation={navigation} title="Credits" />
        <Content>
          <View style={styles.container}>
            <Text style={styles.text}>
              Forgotten Realms is a trademark of Wizards of the Coast, Inc., a
              subsidiary of Hasbro, Inc. All Rights Reserved.
              {"\n\n"}
              Source code is © 2020 by Rodrigo Kuerten.
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    padding: 20,
  },
  text: {
    color: Colors.black,
    fontFamily: "Roboto_medium",
    fontSize: Theme.responsiveFontSize(15),
  },
});
