import React from "react";
import PropTypes from "prop-types";
import { Platform, StyleSheet } from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";

import Colors from "../constants/Colors";

/**
 * Input Dialog component.
 *
 * Displays a modal with a single input. Includes the Go to Year / Cancel buttons.
 */
export default class InputDialog extends React.Component {
  static defaultProps = {
    /** The base value of the input. */
    inputValue: "",
    /** Function that triggers when the input's text changes. */
    onChangeText: () => {},
    /** Functions that triggers when the user touches the Go to Year button. */
    onComplete: () => {},
    /** Function that triggers when the user dismisses the modal. */
    onDismiss: () => {},
    /** Controls whether the modal is visible or not. */
    visible: false,
  };

  render() {
    let {
      onChangeText,
      onComplete,
      onDismiss,
      inputValue,
      visible,
    } = this.props;

    return (
      <Portal>
        <Dialog onDismiss={onDismiss} visible={visible}>
          <Dialog.Title>Insert a Year</Dialog.Title>
          <Dialog.Content>
            <TextInput
              keyboardType={
                Platform.OS === "ios" ? "numbers-and-punctuation" : "numeric"
              }
              label="Go to Year"
              mode="outlined"
              onChangeText={onChangeText}
              placeholder="e.g. 1385"
              placeholderTextColor={Colors.darkGray}
              style={styles.inputStyle}
              theme={{ colors: { primary: Colors.black } }}
              value={inputValue}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button color={Colors.black} onPress={onDismiss}>
              Cancel
            </Button>
            <Button color={Colors.black} onPress={onComplete}>
              Go To Year
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}

InputDialog.propTypes = {
  inputValue: PropTypes.string,
  onChangeText: PropTypes.func,
  onComplete: PropTypes.func,
  onDismiss: PropTypes.func,
  visible: PropTypes.bool,
};

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: Colors.white,
    color: Colors.black,
    fontFamily: "Roboto_medium",
    fontSize: 17,
  },
});
