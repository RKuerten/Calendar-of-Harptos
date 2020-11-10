import React from "react";
import { StyleSheet, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Container } from "native-base";

import { CalendarSwitch, Content, Header, Month } from "../components";

class CalendarClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { isFocused, navigation } = this.props;

    return (
      <Container>
        <Header
          navigation={navigation}
          title="The Year of the Phaerimm's Vengeance"
        />
        <Content>
          <View style={styles.container}>
            <CalendarSwitch title="Year" />
            <CalendarSwitch title="Month" />
            <Month />
          </View>
        </Content>
      </Container>
    );
  }
}

export default function CalendarScreen(props) {
  const isFocused = useIsFocused();
  return <CalendarClass {...props} isFocused={isFocused} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
