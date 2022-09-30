import React from "react";
import { THEMES } from "../../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../screens/Dashboard";
import Projects from "../screens/Projects";
import Tasks from "../screens/Tasks";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

const Routes = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Dashboard") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Projects") {
            iconName = focused ? "folder" : "folder-outline";
          } else if (route.name === "Tasks") {
            iconName = focused ? "clipboard-list" : "clipboard-list-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "account-box" : "account-box-outline";
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarStyle: { backgroundColor: THEMES.PRIMARY },
        headerStyle: { backgroundColor: THEMES.PRIMARY },
        headerTitleStyle: { color: "#fff" },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#ADB5BD",
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Projects" component={Projects} />
      <Tab.Screen name="Tasks" component={Tasks} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Routes;
