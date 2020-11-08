import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Container, Icon } from "native-base";

import { Content } from "../components";
import Colors from "../constants/Colors";

export default class CalendarScreen extends React.Component {
  state = {};

  render() {
    let { navigation } = this.props;

    return (
      <Container>
        <Content>
          <View style={styles.fullView}>
            <Text>Initial version</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  fullView: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
