import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";

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
      <>
        <StatusBar
          backgroundColor="#F0BE8F"
          barStyle="dark-content"
          translucent={false}
        />
        <AppLoading
          startAsync={loadResourcesAsync}
          onError={handleLoadingError}
          onFinish={() => handleFinishLoading(setLoadingComplete)}
        />
      </>
    );
  } else {
    return (
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <StatusBar
            backgroundColor="#F0BE8F"
            barStyle="dark-content"
            translucent={false}
          />
          <AppNavigator />
        </PaperProvider>
      </NavigationContainer>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require("./assets/images/splash.png"),
      require("./assets/images/adaptive-icon.png"),
    ]),
    Font.loadAsync({
      Roboto: Roboto_400Regular,
      Roboto_medium: Roboto_500Medium,
    }),
  ]);
}

function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}
