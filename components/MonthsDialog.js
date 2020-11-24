import React from "react";
import PropTypes from "prop-types";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Dialog, Portal } from "react-native-paper";

import { months } from "../data/Months";
import Colors from "../constants/Colors";
import Theme from "../utils/Theme";
const windowSize = Dimensions.get("window");

/**
 * Months Dialog component.
 *
 * Displays a modal with the list of months. Includes a cancel button.
 */
export default class MonthsDialog extends React.Component {
  static defaultProps = {
    /** Function that triggers when the user dismisses the modal. */
    onDismiss: () => {},
    /** Function that triggers when the user taps one of the months in the list. */
    onPressMonth: () => {},
    /** Controls whether the modal is visible or not. */
    visible: false,
  };

  /**
   * Formats the month index for the list.
   *
   * Returns the month index formatted as a two-digit number (with leading 0 when it is lower than 10).
   *
   * @param {Number} value The value of the month index.
   *
   * @returns {String} The formatted value of the index.
   */
  _getIndex = (value) => {
    if (value > 9) {
      return value.toString();
    } else {
      return "0" + value.toString();
    }
  };

  _renderMonth = ({ item, index }) => {
    let { onPressMonth } = this.props;
    const indexValue = this._getIndex(index + 1);

    return (
      <TouchableOpacity
        style={styles.itemWrapper}
        onPress={() => onPressMonth(index)}
      >
        <Text style={styles.itemTitle}>{`${indexValue}. ${item.name}`}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    let { onDismiss, visible } = this.props;

    return (
      <Portal>
        <Dialog onDismiss={onDismiss} visible={visible}>
          <Dialog.Title>Choose a Month</Dialog.Title>
          <Dialog.ScrollArea style={styles.dialogScrollArea(windowSize)}>
            <FlatList
              data={months}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={this._renderMonth}
            />
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button color={Colors.black} onPress={onDismiss}>
              Cancel
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}

MonthsDialog.propTypes = {
  onDismiss: PropTypes.func.isRequired,
  onPressMonth: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  dialogScrollArea: (windowSize) => ({
    maxHeight: windowSize.height * 0.4,
    paddingHorizontal: 0,
  }),
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
  separator: {
    borderTopWidth: 1,
    borderColor: Colors.dayBorder,
  },
});
