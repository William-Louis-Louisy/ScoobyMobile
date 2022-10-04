import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import trad from "../../lang/trad.json";
import { API_URL, THEMES } from "../../../constants";
import Btn from "../../components/common/Btn";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../contexts/UserProvider";

const Login = () => {
  const navigation = useNavigation();
  const { storeUser, user, lang } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleClick = async (e) => {
    setLoading(true);
    e.preventDefault();
    await saveLoggedUser();
    setLoading(false);
  };

  const saveLoggedUser = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/users/login`, {
        email: loginForm.email,
        password: loginForm.password,
      });
      if (data) {
        await storeUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>CHARGEMENT</Text>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (user._id !== "") {
    navigation.navigate("DashboardRoutes");
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Image
        style={styles.image}
        source={{
          uri: "https://ucarecdn.com/9baa73b3-d97c-454f-afe6-45e4c7130812/LogoSG1.png",
        }}
      />
      <View style={styles.inputsBlock}>
        <TextInput
          autoComplete="email"
          keyboardType="email-address"
          style={styles.input}
          placeholder={trad[lang].common.emailPlaceHolder}
          placeholderTextColor={THEMES.PRIMARY}
          onChangeText={(text) => setLoginForm({ ...loginForm, email: text })}
        />
        <TextInput
          autoComplete="password"
          keyboardType="password"
          style={styles.input}
          secureTextEntry={true}
          placeholder={trad[lang].common.passwordPlaceHolder}
          placeholderTextColor={THEMES.PRIMARY}
          onChangeText={(text) =>
            setLoginForm({ ...loginForm, password: text })
          }
        />
        <View style={styles.btnBlock}>
          <Btn
            title={trad[lang].common.signIn}
            color={THEMES.PRIMARY}
            textColor={THEMES.WHITE}
            action={(e) => handleClick(e)}
          />
          <TouchableOpacity
            style={{
              marginTop: 16,
            }}
            onPress={() => navigation.navigate("Register", {})}
          >
            <Text style={styles.notRegisteredText}>
              {trad[lang].common.notRegistered}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
  },
  contentContainer: {
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: THEMES.PRIMARY,
    color: THEMES.PRIMARY,
    borderRadius: 6,
    marginBottom: 16,
    width: "80%",
    padding: 8,
  },
  image: {
    width: "80%",
    height: 300,
    objectFit: "contain",
    alignSelf: "center",
  },
  inputsBlock: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 48,
  },
  btnBlock: {
    width: "80%",
    marginTop: 16,
  },
  loading: {
    flex: 1,
    zIndex: 999,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.8)",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});

export default Login;
