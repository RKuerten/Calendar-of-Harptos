import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "native-base";

import Colors from "../constants/Colors";
import Theme from "../utils/Theme";

export default class LunarMonth extends React.Component {
  static defaultProps = {
    month: {
      name: "",
      holiday: "",
      event: "",
      leap: false,
    },
  };

  _getMoonPhase = (day) => {
    let { phases } = this.props;
    let type = phases.moon[phases.days.findIndex((dayS) => dayS === day)];

    if (type === "fm") {
      return (
        <Icon
          style={styles.icon}
          type="MaterialCommunityIcons"
          name="moon-full"
        />
      );
    } else if (type === "nm") {
      return (
        <Icon
          style={styles.icon}
          type="MaterialCommunityIcons"
          name="moon-new"
        />
      );
    } else if (type === "fq") {
      return (
        <Icon
          style={styles.icon}
          type="MaterialCommunityIcons"
          name="moon-first-quarter"
        />
      );
    } else if (type === "lq") {
      return (
        <Icon
          style={styles.icon}
          type="MaterialCommunityIcons"
          name="moon-last-quarter"
        />
      );
    }
  };

  render() {
    let { isLeapYear, month, phases } = this.props;

    return (
      <View>
        <View style={[styles.monthRow, monthBorder[1]]}>
          {Array.from(Array(10), (e, i) => i + 1).map(
            (day, key, { length }) => (
              <View style={styles.dayBox(length - 1 === key)} key={key}>
                {phases.days.some((dayS) => dayS === day) ? (
                  this._getMoonPhase(day)
                ) : (
                  <Text style={styles.dayText}>{day}</Text>
                )}
              </View>
            )
          )}
        </View>
        <View style={[styles.monthRow, monthBorder[2]]}>
          {Array.from(Array(10), (e, i) => i + 11).map(
            (day, key, { length }) => (
              <View
                style={[
                  styles.dayBox(length - 1 === key),
                  day === month.eventDay && styles.dayBackground,
                ]}
                key={key}
              >
                {phases.days.some((dayS) => dayS === day) ? (
                  this._getMoonPhase(day)
                ) : (
                  <Text style={styles.dayText}>{day}</Text>
                )}
              </View>
            )
          )}
        </View>
        <View style={[styles.monthRow, monthBorder[3]]}>
          {Array.from(Array(10), (e, i) => i + 21).map(
            (day, key, { length }) => (
              <View
                style={[
                  styles.dayBox(length - 1 === key),
                  day === month.eventDay && styles.dayBackground,
                ]}
                key={key}
              >
                {phases.days.some((dayS) => dayS === day) ? (
                  this._getMoonPhase(day)
                ) : (
                  <Text style={styles.dayText}>{day}</Text>
                )}
              </View>
            )
          )}
        </View>
        {month.holiday.length > 0 && (
          <View style={styles.holidayRow}>
            <Text style={styles.holidayText}>{month.holiday}</Text>
            {phases.days.findIndex((day) => day === 31) &&
              this._getMoonPhase(31)}
          </View>
        )}
        {month.leap && isLeapYear === 0 && (
          <View style={styles.holidayRow}>
            <Text style={styles.holidayText}>
              Shieldmeet (Once Every Four Years)
            </Text>
            {phases.days.findIndex((day) => day === 32) &&
              this._getMoonPhase(32)}
          </View>
        )}
        {month.event.length > 0 && (
          <View style={styles.seasonRow}>
            <Text style={styles.seasonText}>{month.event}</Text>
          </View>
        )}
      </View>
    );
  }
}

const monthBorder = {
  1: {
    borderColor: Colors.dayBorder,
    borderWidth: 1,
  },
  2: {
    borderColor: Colors.dayBorder,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  3: {
    borderColor: Colors.dayBorder,
    borderWidth: 1,
  },
};

const styles = StyleSheet.create({
  icon: {
    color: Colors.black,
    fontSize: Theme.responsiveFontSize(18),
    width: Theme.responsiveFontSize(16) + 2,
    textAlign: "center",
  },
  monthRow: {
    display: "flex",
    flexDirection: "row",
  },
  dayBox: (last) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.dayBorder,
    borderRightWidth: last ? 0 : 1,
    padding: Theme.relativeWidth(2),
  }),
  dayBackground: {
    backgroundColor: Colors.dayBorder,
  },
  dayText: {
    color: Colors.black,
    fontSize: Theme.responsiveFontSize(16),
    width: Theme.responsiveFontSize(16) + 2,
    textAlign: "center",
  },
  holidayRow: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderColor: Colors.dayBorder,
    borderWidth: 1,
    marginTop: 10,
    padding: Theme.relativeWidth(2),
  },
  holidayText: {
    color: Colors.black,
    fontSize: Theme.responsiveFontSize(16),
    marginRight: 5,
    textAlign: "center",
  },
  seasonRow: {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
    padding: Theme.relativeWidth(2),
  },
  seasonText: {
    color: Colors.black,
    fontSize: Theme.responsiveFontSize(16),
    textAlign: "center",
  },
});
