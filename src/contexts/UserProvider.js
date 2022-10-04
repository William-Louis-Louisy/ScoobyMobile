import axios from "axios";
import { API_URL } from "../../constants";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { createContext, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import trad from "../lang/trad.json";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const isLogged = useRef(false);
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
    try {
      await AsyncStorage.setItem("user-avatar", value.avatar);
      await AsyncStorage.setItem("user-firstname", value.firstname);
      await AsyncStorage.setItem("user-lastname", value.lastname);
      await AsyncStorage.setItem("user-email", value.email);
      await AsyncStorage.setItem("user-id", value._id);
      setUser(value);
      Toast.show({
        type: "success",
        text1: trad[lang].toasts.welcome,
        text2: trad[lang].toasts.userConnected,
        position: "top",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 80,
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: trad[lang].toasts.oops,
        text2: trad[lang].toasts.userNotValidCredentials,
        position: "top",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 80,
      });
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
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
  };

  // STORE LANGUAGE IN ASYNSTORAGE
  const storeLang = async (lang) => {
    try {
      await AsyncStorage.setItem("lang", lang);
      setLang(lang);
    } catch (err) {
      console.error(err);
    }
  };

  // GET LANGUAGE FROM ASYNSTORAGE
  useEffect(() => {
    const getLang = async () => {
      try {
        const data = await AsyncStorage.getItem("lang");
        data && setLang(data || lang);
      } catch (err) {
        console.error(err);
      }
    };
    getLang();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLogged,
        lang,
        user,
        setLang,
        setUser,
        logOut,
        storeUser,
        storeLang,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
