import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Colors from "../constants/Colors";
import Theme from "../utils/Theme";

export default class ListItem extends React.Component {
  static defaultProps = {
    onPress: () => {},
    item: { year: "", name: "" },
    textLength: 0,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.textLength !== this.props.textLength;
  }

  render() {
    let { item, onPress } = this.props;

    return (
      <TouchableOpacity style={styles.itemWrapper} onPress={onPress}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text accessibilityLabel={`${item.year} D.R.`} style={styles.itemDesc}>
          {`${item.year} DR`}
        </Text>
      </TouchableOpacity>
    );
  }
}

ListItem.propTypes = {
  onPress: PropTypes.func,
  item: PropTypes.object.isRequired,
  textLength: PropTypes.number.isRequired,
};

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
    color: Colors.darkGray,
    fontSize: Theme.responsiveFontSize(14),
  },
});
