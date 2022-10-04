import React, { useContext } from "react";
import Tasks from "../screens/Tasks";
import { THEMES } from "../../constants";
import Profile from "../screens/Profile";
import Login from "../screens/Auth/Login";
import Projects from "../screens/Projects";
import Dashboard from "../screens/Dashboard";
import Register from "../screens/Auth/Register";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import trad from "../lang/trad.json";
import { Image } from "react-native";
import { UserContext } from "../contexts/UserProvider";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardRoutes = () => {
  const { lang } = useContext(UserContext);

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === trad[lang].routes.dashboard) {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === trad[lang].routes.projects) {
            iconName = focused ? "folder" : "folder-outline";
          } else if (route.name === trad[lang].routes.tasks) {
            iconName = focused ? "clipboard-list" : "clipboard-list-outline";
          } else if (route.name === trad[lang].routes.profile) {
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
        headerLeft: () => (
          <Image
            style={{ height: 64, width: 64 }}
            source={require("../assets/iconexpo.png")}
          />
        ),
      })}
    >
      <Tab.Screen name={trad[lang].routes.dashboard} component={Dashboard} />
      <Tab.Screen name={trad[lang].routes.projects} component={Projects} />
      <Tab.Screen name={trad[lang].routes.tasks} component={Tasks} />
      <Tab.Screen name={trad[lang].routes.profile} component={Profile} />
    </Tab.Navigator>
  );
};

const Routes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="DashboardRoutes" component={DashboardRoutes} />
    </Stack.Navigator>
  );
};

export default Routes;
