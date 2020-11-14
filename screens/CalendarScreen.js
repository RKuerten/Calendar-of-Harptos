import React from "react";
import { StyleSheet, View } from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { Container } from "native-base";

import { months } from "../data/Months";
import { years } from "../data/Years";
import { CalendarSwitch, Content, Header, Month } from "../components";

const yearsMax = years.length; //2296

class CalendarClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fyear: { year: "", name: "" },
      month: 0,
      year: 2188, //1492 DR
      useFYear: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.route.params == null && this.props.route.params != null) {
      this.setState({ year: this.props.route.params.year });
    } else if (
      prevProps.route.params != null &&
      this.props.route.params != null
    ) {
      if (prevProps.route.params.year !== this.props.route.params.year) {
        this.setState({ year: this.props.route.params.year });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.route.params != null) {
      return true;
    } else if (
      nextState.year !== this.state.year ||
      nextState.month !== this.state.month
    ) {
      return true;
    } else {
      return false;
    }
  }

  _getYearLabel = () => {
    let { fyear, useFYear, year } = this.state;
    if (useFYear) {
      return fyear.name;
    } else {
      return `${years[year].year} DR`;
    }
  };

  _getYearName = () => {
    let { fyear, useFYear, year } = this.state;
    if (useFYear) {
      return fyear.name;
    } else {
      return years[year].name;
    }
  };

  _handleMonthDown = () => {
    let { month } = this.state;
    if (month - 1 < 0) {
      this.setState({ month: 11 }, () => this._handleYearDown());
    } else {
      this.setState({ month: month - 1 });
    }
  };

  _handleMonthUp = () => {
    let { month } = this.state;
    if (month + 1 > 11) {
      this.setState({ month: 0 }, () => this._handleYearUp());
    } else {
      this.setState({ month: month + 1 });
    }
  };

  _handleYearDown = () => {
    let { fyear, useFYear, year } = this.state;
    if (useFYear) {
      if (fyear.year - 1 === 1600) {
        this.setState({ year: 2296, useFYear: false });
      } else {
        this.setState({
          fyear: {
            year: fyear.year - 1,
            name: `${fyear.year - 1} DR`,
          },
        });
      }
    } else if (year - 1 === -1) {
      this.setState({
        fyear: {
          year: -701,
          name: "-701 DR",
        },
        useFYear: true,
      });
    } else {
      this.setState({ year: year - 1 });
    }
  };

  _handleYearUp = () => {
    let { fyear, useFYear, year } = this.state;
    if (useFYear) {
      if (fyear.year + 1 === -700) {
        this.setState({ year: 0, useFYear: false });
      } else {
        this.setState({
          fyear: {
            year: fyear.year + 1,
            name: `${fyear.year + 1} DR`,
          },
        });
      }
    } else if (year + 1 === yearsMax) {
      this.setState({
        fyear: {
          year: 1601,
          name: "1601 DR",
        },
        useFYear: true,
      });
    } else {
      this.setState({ year: year + 1 });
    }
  };

  _isLeapYear = () => {
    let { fyear, useFYear, year } = this.state;
    let currentYear = 0;
    if (useFYear) {
      currentYear = fyear.year;
    } else {
      currentYear = parseInt(years[year].year);
    }
    if (Math.sqrt(Math.pow(currentYear % 4, 2)) !== 0) {
      return false;
    } else {
      return true;
    }
  };

  render() {
    let { navigation } = this.props;
    let { month } = this.state;
    const isLeapYear = this._isLeapYear();
    const yearLabel = this._getYearLabel();
    const yearName = this._getYearName();

    return (
      <Container>
        <Header navigation={navigation} title={yearName} />
        <Content>
          <View style={styles.container}>
            <CalendarSwitch
              onPressLeft={() => this._handleYearDown()}
              onPressRight={() => this._handleYearUp()}
              title={yearLabel}
            />
            <CalendarSwitch
              onPressLeft={() => this._handleMonthDown()}
              onPressRight={() => this._handleMonthUp()}
              title={months[month].name}
            />
            <Month month={months[month]} isLeapYear={isLeapYear} />
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
