import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Colors from "../constants/Colors";
import Theme from "../utils/Theme";

export default class ListItem extends React.Component {
  static defaultProps = {
    onPress: () => {},
    item: { year: "", name: "" },
    shouldUpdate: false,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.shouldUpdate;
  }

  render() {
    let { item, onPress } = this.props;

    return (
      <TouchableOpacity style={styles.itemWrapper} onPress={onPress}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemDesc}>{`${item.year} DR`}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    marginHorizontal: 10,
    padding: 10,
  },
  itemTitle: {
    color: Colors.black,
    fontFamily: "Roboto_medium",
    fontSize: Theme.responsiveFontSize(16),
    marginVertical: 2,
  },
  itemDesc: {
    color: "#666",
    fontSize: Theme.responsiveFontSize(14),
  },
});
