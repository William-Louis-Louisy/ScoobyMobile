import axios from "axios";
import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../constants";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    _id: "",
    avatar: "",
    firstname: "",
    lastname: "",
    email: "",
  });
  const [lang, setLang] = useState("fr");

  // STORE USER IN ASYNC STORAGE
  const storeUser = async (value) => {
    console.log("storeUser", value);
    try {
      await AsyncStorage.setItem("user-avatar", value.avatar);
      await AsyncStorage.setItem("user-firstname", value.firstname);
      await AsyncStorage.setItem("user-lastname", value.lastname);
      await AsyncStorage.setItem("user-email", value.email);
      await AsyncStorage.setItem("user-id", value._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        console.log("ICI");
        setUser({
          _id: await AsyncStorage.getItem("user-id"),
          avatar: await AsyncStorage.getItem("user-avatar"),
          firstname: await AsyncStorage.getItem("user-firstname"),
          lastname: await AsyncStorage.getItem("user-lastname"),
          email: await AsyncStorage.getItem("user-email"),
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  const logOut = async () => {
    await axios.get(`${API_URL}/users/logout`);
    setUser({
      _id: "",
      avatar: "",
      firstname: "",
      lastname: "",
      email: "",
    });
    AsyncStorage.clear();
    window.location.replace("/");
  };

  console.log("USER : ", user);

  return (
    <UserContext.Provider
      value={{ lang, user, setLang, setUser, logOut, storeUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
