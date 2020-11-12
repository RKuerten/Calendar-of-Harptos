import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "native-base";

import Colors from "../constants/Colors";
import CalendarScreen from "../screens/CalendarScreen";
import LunarCalendarScreen from "../screens/LunarCalendarScreen";
import SearchScreen from "../screens/SearchScreen";
import CreditsScreen from "../screens/CreditsScreen";

const Tab = createBottomTabNavigator();

const icons = {
  Calendar: {
    name: "calendar",
    type: "MaterialCommunityIcons",
  },
  LunarCalendar: {
    name: "moon-waning-crescent",
    type: "MaterialCommunityIcons",
  },
  Search: {
    name: "search",
    type: "MaterialIcons",
  },
  Credits: {
    name: "copyright",
    type: "MaterialCommunityIcons",
  },
};

const DefaultNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Calendar"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          return (
            <Icon
              style={[styles.icon, focused && styles.iconActive]}
              type={icons[route.name].type}
              name={icons[route.name].name}
            />
          );
        },
      })}
      tabBarOptions={{
        style: {
          alignItems: "center",
          backgroundColor: Colors.tintColor,
          height: 60,
          justifyContent: "space-between",
        },
        activeTintColor: "#fff",
        inactiveTintColor: Colors.tabIconDefault,
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen
        name="Calendar"
        options={{ title: "" }}
        component={CalendarScreen}
      />
      <Tab.Screen
        name="LunarCalendar"
        options={{ title: "" }}
        component={LunarCalendarScreen}
      />
      <Tab.Screen
        name="Search"
        options={{ title: "" }}
        component={SearchScreen}
      />
      <Tab.Screen
        name="Credits"
        options={{ title: "" }}
        component={CreditsScreen}
      />
    </Tab.Navigator>
  );
};

export default DefaultNavigation;

const styles = StyleSheet.create({
  icon: {
    color: "rgba(0, 0, 0, 0.40)",
    fontSize: 30,
    marginTop: 15,
  },
  iconActive: { color: Colors.black },
});
