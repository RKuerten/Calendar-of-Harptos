import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Colors from "../constants/Colors";
import Theme from "../utils/Theme";

/**
 * List Item component.
 *
 * Item component for the Search screen. Includes a main label (the Year's name) and
 * a secondary label (the Year's value).
 */
export default class ListItem extends React.Component {
  static defaultProps = {
    /** Function that triggers when the user taps on the item. */
    onPress: () => {},
    /** The object containing the year's data (name and value). */
    item: { year: "", name: "" },
    /** The current length of the text in the search bar. */
    textLength: 0,
  };

  /**
   * Determines if the component should update or not.
   *
   * Returns true if length of the search bar's text changed when compared with the 
   * current prop.
   *
   * @param {Object} nextProps The screen's props of the pending update.
   *
   * @returns {boolean} Either should the screen update or not.
   */
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
