import { THEMES } from "./constants";
import Routes from "./src/routes/Routes";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import UserProvider from "./src/contexts/UserProvider";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: THEMES.BACKGROUND,
  },
};

export default function App() {
  return (
    <UserProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={MyTheme}>
        <Routes />
        <Toast />
      </NavigationContainer>
    </UserProvider>
  );
}
