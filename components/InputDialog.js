import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";

import Colors from "../constants/Colors";

export default class InputDialog extends React.Component {
  static defaultProps = {
    inputValue: "",
    onChangeText: () => {},
    onComplete: () => {},
    onDismiss: () => {},
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
        <Dialog
          onDismiss={onDismiss}
          style={styles.dialogWrapper}
          visible={visible}
        >
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

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: Colors.white,
    color: Colors.black,
    fontFamily: "Roboto_medium",
    fontSize: 17,
  },
});
