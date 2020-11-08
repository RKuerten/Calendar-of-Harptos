import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Calendar from "../screens/Calendar";

const Stack = createStackNavigator();

const DefaultNavigation = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Calendar">
      <Stack.Screen name="Calendar" component={Calendar} />
    </Stack.Navigator>
  );
};

export default DefaultNavigation;
