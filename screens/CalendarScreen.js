import React from "react";
import { StyleSheet, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Container } from "native-base";

import { months } from "../data/Months";
import { CalendarSwitch, Content, Header, Month } from "../components";

class CalendarClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: 0,
    };
  }

  _handleMonthDown = () => {
    let { month } = this.state;
    if (month - 1 < 0) {
      this.setState({ month: 11 }); //add -1 to year
    } else {
      this.setState({ month: month - 1 });
    }
  };

  _handleMonthUp = () => {
    let { month } = this.state;
    if (month + 1 > 11) {
      this.setState({ month: 0 }); //add +1 to year
    } else {
      this.setState({ month: month + 1 });
    }
  };

  render() {
    let { navigation } = this.props;
    let { month } = this.state;

    return (
      <Container>
        <Header
          navigation={navigation}
          title="The Year of the Phaerimm's Vengeance"
        />
        <Content>
          <View style={styles.container}>
            <CalendarSwitch title="Year" />
            <CalendarSwitch
              onPressLeft={() => this._handleMonthDown()}
              onPressRight={() => this._handleMonthUp()}
              title={months[month].name}
            />
            <Month month={months[month]} />
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
