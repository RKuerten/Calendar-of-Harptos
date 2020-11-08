import React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Content = (props, style = {}) => (
  <KeyboardAwareScrollView
    enableOnAndroid
    enableAutomaticScroll
    keyboardOpeningTime={0}
  >
    <View style={style}>{props.children}</View>
  </KeyboardAwareScrollView>
);

export default Content;
