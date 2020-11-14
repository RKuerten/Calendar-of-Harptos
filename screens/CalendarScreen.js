import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

import { months } from "../data/Months";
import { phases } from "../data/MoonPhases";
import { years } from "../data/Years";
import { CalendarSwitch, Header, LunarMonth, Month } from "../components";
import Colors from "../constants/Colors";
import Theme from "../utils/Theme";

const yearsMax = years.length; //2296

class CalendarClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fyear: { year: "", name: "" },
      lunar: false,
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
      nextState.month !== this.state.month ||
      nextState.lunar !== this.state.lunar
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
    return Math.sqrt(Math.pow(currentYear % 4, 2));
  };

  render() {
    let { navigation } = this.props;
    let { lunar, month } = this.state;
    const isLeapYear = this._isLeapYear();
    const yearLabel = this._getYearLabel();
    const yearName = this._getYearName();

    return (
      <View style={styles.container}>
        <Header navigation={navigation} title={yearName} />
        <View style={styles.innerContainer}>
          <View style={styles.topView}>
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
            {lunar ? (
              <LunarMonth
                isLeapYear={isLeapYear}
                month={months[month]}
                phases={phases[isLeapYear][month]}
              />
            ) : (
              <Month month={months[month]} isLeapYear={isLeapYear} />
            )}
          </View>
          <View style={styles.bottomView}>
            <Switch
              color={Colors.darkGray}
              onValueChange={() => this.setState({ lunar: !lunar })}
              value={lunar}
            />
            <Text style={styles.switchText}>Toggle lunar phases</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default function CalendarScreen(props) {
  const isFocused = useIsFocused();

  return <CalendarClass {...props} isFocused={isFocused} />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  topView: {
    alignItems: "center",
  },
  bottomView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  switchText: {
    color: Colors.black,
    fontFamily: "Roboto_medium",
    fontSize: Theme.responsiveFontSize(16),
    marginLeft: 5,
    marginBottom: 3,
  },
});
