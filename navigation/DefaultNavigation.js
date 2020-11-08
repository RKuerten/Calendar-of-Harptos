import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CalendarScreen from "../screens/CalendarScreen";

const Stack = createStackNavigator();

const DefaultNavigation = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Calendar">
      <Stack.Screen name="Calendar" component={CalendarScreen} />
    </Stack.Navigator>
  );
};

export default DefaultNavigation;
