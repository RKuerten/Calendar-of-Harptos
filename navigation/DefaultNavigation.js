import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import CalendarScreen from "../screens/CalendarScreen";
import AboutScreen from "../screens/AboutScreen";
import SearchScreen from "../screens/SearchScreen";
import CreditsScreen from "../screens/CreditsScreen";

const Tab = createBottomTabNavigator();

const icons = {
  Calendar: {
    name: "calendar",
    type: "MaterialCommunityIcons",
  },
  Search: {
    name: "search",
    type: "MaterialIcons",
  },
  About: {
    name: "information-outline",
    type: "MaterialCommunityIcons",
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
          if (icons[route.name].type === "MaterialCommunityIcons") {
            return (
              <MaterialCommunityIcons
                style={[styles.icon, focused && styles.iconActive]}
                name={icons[route.name].name}
              />
            );
          } else {
            return (
              <MaterialIcons
                style={[styles.icon, focused && styles.iconActive]}
                name={icons[route.name].name}
              />
            );
          }
        },
        tabBarAccessibilityLabel: route.name,
      })}
      tabBarOptions={{
        activeTintColor: "#fff",
        inactiveTintColor: Colors.tabIconDefault,
        keyboardHidesTabBar: true,
        style: {
          alignItems: "center",
          backgroundColor: Colors.tintColor,
          height: 60,
          justifyContent: "space-between",
        },
      }}
    >
      <Tab.Screen
        name="Calendar"
        options={{ title: "" }}
        component={CalendarScreen}
      />
      <Tab.Screen
        name="Search"
        options={{ title: "" }}
        component={SearchScreen}
      />
      <Tab.Screen
        name="About"
        options={{ title: "" }}
        component={AboutScreen}
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
