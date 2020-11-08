import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Root } from "native-base";

import { AppNavigator } from "./navigation/AppNavigator";
import Colors from "./constants/Colors";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.tintColor,
    accent: Colors.tintColor,
  },
};

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <NavigationContainer>
        <Root>
          <PaperProvider theme={theme}>
            <View style={styles.container}>
              {Platform.OS === "ios" && <StatusBar barStyle="default" />}
              <AppNavigator />
            </View>
          </PaperProvider>
        </Root>
      </NavigationContainer>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require("./assets/images/splash.png"),
      require("./assets/images/adaptive-background.png"),
      require("./assets/images/icon-mini.png"),
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    }),
  ]);
}

function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
