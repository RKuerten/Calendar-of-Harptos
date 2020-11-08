import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Spinner } from "native-base";
import Colors from "../constants/Colors";

const Loading = ({ title, style = {} }) => (
  <View style={[styles.viewBox, style]}>
    <Spinner color={Colors.grayText} />
    <Text style={styles.textStyle}>{title ? title : "Carregando..."}</Text>
  </View>
);

export default Loading;

const styles = StyleSheet.create({
  viewBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
  },
  textStyle: {
    color: Colors.black,
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 20,
  },
});
