import { THEMES } from "./constants";
import Routes from "./src/routes/Routes";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import UserProvider from "./src/contexts/UserProvider";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useState } from "react";
import RoutesAuth from "./src/routes/RoutesAuth";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: THEMES.BACKGROUND,
  },
};

export default function App() {
  const [isLoggedUser, setIsLoggedUser] = useState(false);
  return (
    <UserProvider>
      <StatusBar style={isLoggedUser ? "light" : "dark"} />
      <NavigationContainer theme={MyTheme}>
        {isLoggedUser ? <Routes /> : <RoutesAuth />}
        <Toast />
      </NavigationContainer>
    </UserProvider>
  );
}
