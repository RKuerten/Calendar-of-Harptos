import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-paper";

import { months } from "../data/Months";
import { phases } from "../data/MoonPhases";
import { years } from "../data/Years";
import {
  CalendarSwitch,
  Header,
  InputDialog,
  LunarMonth,
  Month,
  MonthsDialog,
} from "../components";
import Colors from "../constants/Colors";
import Theme from "../utils/Theme";

/** Constant with the total of named years (2296). */
const yearsMax = years.length;

/**
 * The Forgotten Realms' Calendar of Harptos.
 *
 * Presents a basic calendar navigation of the fictional Calendar of Harptos,
 * where the user can go through by per month, per year, or simply jump through
 * a specific month or year. There's also a switch on the screen that toggles the
 * visibility of the lunar phase within the calendar.
 */
export default class CalendarScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /** Controls the value of the year when the value is below -700 or higher than 1600. */
      fyear: { year: "", name: "" },
      /** Controls the lunar phase switch. */
      lunar: false,
      /** Index of the current month in display (Hammer). */
      month: 0,
      /** Index of the current year in display (1492). */
      year: 2188,
      /** Controls the value of the input of the Year dialog. */
      yearDialog: "",
      /** Controls whether the Month list dialog is in display. */
      listVisible: false,
      /** Controls whether the Year input dialog is in display. */
      dialogVisible: false,
      /** Controls whether fyear should be used for the year index control. */
      useFYear: false,
    };
  }

  /**
   * Invoked when the component is updated.
   *
   * Used when the user comes from the search screen, updating the year index used
   * for the calendar.
   *
   * @param {Object} prevProps The screen's props before the update happened.
   */
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

  /**
   * Determines if the component should update or not.
   *
   * Returns true if the route parameters are not null, or whether the user has changed
   * the year or month, toggled the lunar phase switch, or opened one of the dialogs.
   *
   * @param {Object} nextProps The screen's props of the pending update.
   * @param {Object} nextState The screen's state of the pending update.
   *
   * @returns {boolean} Either should the screen update or not.
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.route.params != null) {
      return true;
    } else if (
      nextState.year !== this.state.year ||
      nextState.month !== this.state.month ||
      nextState.lunar !== this.state.lunar ||
      nextState.dialogVisible !== this.state.dialogVisible ||
      nextState.listVisible !== this.state.listVisible ||
      nextState.yearDialog !== this.state.yearDialog ||
      nextState.useFYear !== this.state.useFYear ||
      nextState.fyear.year !== this.state.fyear.year
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Returns the year value with the reckoning abbreviation.
   *
   * Returns fyear.name if a non-named year is in use. Otherwise, gets the year value and
   * concatenates it with DR.
   *
   * @returns {String} The year value followed by DR.
   */
  _getYearLabel = () => {
    let { fyear, useFYear, year } = this.state;
    if (useFYear) {
      return fyear.name;
    } else {
      return `${years[year].year} DR`;
    }
  };

  /**
   * Returns the year name whenever possible.
   *
   * Returns "fyear.name" if a non-named year is in use (e.g. -702 DR). Otherwise, returns
   * the year name from the Roll of the Years.
   *
   * @return {String} The year name.
   */
  _getYearName = () => {
    let { fyear, useFYear, year } = this.state;
    if (useFYear) {
      return fyear.name;
    } else {
      return years[year].name;
    }
  };

  /**
   * Decrements the month index value.
   *
   * Decrements the month index by 1. If the next index would be lower than 0,
   * decrements the year index by 1 and sets the month index to 11 (12th month).
   */
  _handleMonthDown = () => {
    let { month } = this.state;
    if (month - 1 < 0) {
      this.setState({ month: 11 }, () => this._handleYearDown());
    } else {
      this.setState({ month: month - 1 });
    }
  };

  /**
   * Increments the month index value.
   *
   * Increments the month index by 1. If the next index would be higher than 11,
   * increments the year index by 1 and sets the month index to 0 (1st month).
   */
  _handleMonthUp = () => {
    let { month } = this.state;
    if (month + 1 > 11) {
      this.setState({ month: 0 }, () => this._handleYearUp());
    } else {
      this.setState({ month: month + 1 });
    }
  };

  /**
   * Sets the month index value directly.
   *
   * Sets the month index value to the one chosen by the user in the Month list dialog.
   * It also hides the Month list dialog.
   * 
   * @param {Number} month The index of the month chosen.
   */
  _handleSetMonth = (month) => {
    this.setState({ month, listVisible: false });
  };

  /**
   * Sets the year index to the one inputted by the user.
   *
   * Sets the year index to the one inputted by the user in the Year input dialog.
   * It also hides the Year input dialog.
   */
  _handleYearDialog = () => {
    let { yearDialog } = this.state;
    let intYear = parseInt(yearDialog);

    if (isNaN(intYear)) {
      console.warn("Is NaN");
    } else if (intYear > 1600 || intYear < -700) {
      this.setState({
        fyear: {
          year: intYear,
          name: `${intYear} DR`,
        },
        yearDialog: "",
        useFYear: true,
      });
    } else {
      let index = years.findIndex((yearz) => yearz.year === yearDialog);
      this.setState({ year: index, useFYear: false, yearDialog: "" });
    }
  };

  /**
   * Decrements the year index value.
   *
   * Decrements the year index by 1. If the next index would be lower than 0,
   * sets useFYear to true and starts using fyear to track the years.
   */
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

  /**
   * Increments the year index value.
   *
   * Increments the year index by 1. If the next index would be higher than 2295,
   * sets useFYear to true and starts using fyear to track the years.
   */
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

  /**
   * Calculates if a year is leap year or not.
   *
   * Returns the positive value of the division of the current year by 4.
   * The year is considered a leap year if the value is 0.
   * 
   * @returns {Number} A value between 0 and 3 (limits included). 
   */
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
    let { lunar, month, listVisible, dialogVisible, yearDialog } = this.state;
    const isLeapYear = this._isLeapYear();
    const yearLabel = this._getYearLabel();
    const yearName = this._getYearName();

    return (
      <View style={styles.container}>
        <Header navigation={navigation} title={yearName} />
        <InputDialog
          inputValue={yearDialog}
          onChangeText={(text) => {
            this.setState({
              yearDialog: text.replace(/[^0-9-]/g, ""),
            });
          }}
          onComplete={() => {
            this.setState({ dialogVisible: false });
            this._handleYearDialog();
          }}
          onDismiss={() =>
            this.setState({ dialogVisible: false, yearDialog: "" })
          }
          visible={dialogVisible}
        />
        <MonthsDialog
          onDismiss={() => this.setState({ listVisible: false })}
          onPressMonth={this._handleSetMonth}
          visible={listVisible}
        />
        <View style={styles.innerContainer}>
          <View style={styles.topView}>
            <CalendarSwitch
              leftLabel="Decrement year"
              rightLabel="Increment year"
              onPressLeft={() => this._handleYearDown()}
              onPressRight={() => this._handleYearUp()}
              onPressText={() => this.setState({ dialogVisible: true })}
              title={yearLabel}
            />
            <CalendarSwitch
              leftLabel="Decrement month"
              rightLabel="Increment month"
              onPressLeft={() => this._handleMonthDown()}
              onPressRight={() => this._handleMonthUp()}
              onPressText={() => this.setState({ listVisible: true })}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  inputStyle: {
    backgroundColor: Colors.white,
    color: Colors.black,
    fontFamily: "Roboto_medium",
    fontSize: 17,
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
