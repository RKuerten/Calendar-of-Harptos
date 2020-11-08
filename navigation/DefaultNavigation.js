import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CalendarScreen from "../screens/CalendarScreen";
import CreditsScreen from "../screens/CreditsScreen";

const Stack = createStackNavigator();

const DefaultNavigation = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Calendar">
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Credits" component={CreditsScreen} />
    </Stack.Navigator>
  );
};

export default DefaultNavigation;
