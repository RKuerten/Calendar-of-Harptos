import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Colors from "../constants/Colors";
import Theme from "../utils/Theme";

export default class Month extends React.Component {
  render() {
    return (
      <View>
        <View style={[styles.monthRow, monthBorder[1]]}>
          {Array.from(Array(10), (e, i) => i + 1).map(
            (day, key, { length }) => (
              <View style={styles.dayBox(length - 1 === key)} key={key}>
                <Text style={styles.dayText}>{day}</Text>
              </View>
            )
          )}
        </View>
        <View style={[styles.monthRow, monthBorder[2]]}>
          {Array.from(Array(10), (e, i) => i + 11).map(
            (day, key, { length }) => (
              <View style={styles.dayBox(length - 1 === key)} key={key}>
                <Text style={styles.dayText}>{day}</Text>
              </View>
            )
          )}
        </View>
        <View style={[styles.monthRow, monthBorder[3]]}>
          {Array.from(Array(10), (e, i) => i + 21).map(
            (day, key, { length }) => (
              <View style={styles.dayBox(length - 1 === key)} key={key}>
                <Text style={styles.dayText}>{day}</Text>
              </View>
            )
          )}
        </View>
        <View style={styles.holidayRow}>
          <Text style={styles.holidayText}>Midwinter (Annual Holiday)</Text>
        </View>
        <View style={styles.holidayRow}>
          <Text style={styles.holidayText}>
            Shieldmeet (Once Every Four Years)
          </Text>
        </View>
        <View style={styles.seasonRow}>
          <Text style={styles.seasonText}>Ches 19: Spring Equinox</Text>
        </View>
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
  monthRow: {
    display: "flex",
    flexDirection: "row",
  },
  dayBox: (last) => ({
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.dayBorder,
    borderRightWidth: last ? 0 : 1,
    padding: Theme.relativeWidth(2),
  }),
  dayText: {
    color: Colors.black,
    fontSize: Theme.responsiveFontSize(16),
    width: Theme.responsiveFontSize(16) + 2,
    textAlign: "center",
  },
  holidayRow: {
    display: "flex",
    justifyContent: "center",
    borderColor: Colors.dayBorder,
    borderWidth: 1,
    marginTop: 10,
    padding: Theme.relativeWidth(2),
  },
  holidayText: {
    color: Colors.black,
    fontSize: Theme.responsiveFontSize(16),
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