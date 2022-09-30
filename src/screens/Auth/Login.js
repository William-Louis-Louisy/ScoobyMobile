import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import trad from "../../lang/trad.json";
import { API_URL, THEMES } from "../../../constants";
import Btn from "../../components/common/Btn";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../contexts/UserProvider";

const Login = () => {
  const navigation = useNavigation();
  const { storeUser } = useContext(UserContext);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    saveLoggedUser();
  };

  const saveLoggedUser = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/users/login`, {
        email: loginForm.email,
        password: loginForm.password,
      });
      if (data) {
        console.log(data.user);
        storeUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          style={styles.input}
          placeholder={trad["fr"].common.emailPlaceHolder}
          placeholderTextColor={THEMES.PRIMARY}
          onChangeText={(text) => setLoginForm({ ...loginForm, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder={trad["fr"].common.passwordPlaceHolder}
          placeholderTextColor={THEMES.PRIMARY}
          onChangeText={(text) =>
            setLoginForm({ ...loginForm, password: text })
          }
        />
        <View style={styles.btnBlock}>
          <Btn
            title={trad["fr"].common.signIn}
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
              {trad["fr"].common.notRegistered}
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
});

export default Login;
