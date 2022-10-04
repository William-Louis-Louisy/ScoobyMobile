import axios from "axios";
import trad from "../lang/trad.json";
import Btn from "../components/common/Btn";
import { Feather } from "@expo/vector-icons";
import { API_URL, THEMES } from "../../constants";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SettingPopup from "../components/common/SettingPopup";

const Profile = () => {
  const { user, setUser, lang } = useContext(UserContext);
  const [showSettings, setShowSettings] = useState(false);
  const [projects, setProjects] = useState([]);
  const navigation = useNavigation();

  // OPEN SETTINGS POPUP FUNCTION
  const handleShowSettings = () => {
    setShowSettings(true);
  };

  // CLOSE SETTINGS POPUP FUNCTION
  const handleHideSettings = () => {
    setShowSettings(false);
  };

  // GET USER PROJECTS
  const getProjects = async () => {
    try {
      const data = await axios
        .get(`${API_URL}/projects/user/${user.email}`)
        .then((result) => {
          setProjects(result.data.data);
        });
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);

  // LOGOUT FUNCTION
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

  // HANDLE LOGOUT AND REDIRECT TO LOGIN SCREEN
  const handleLogOut = async () => {
    await logOut();
    navigation.navigate("Login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.settingsRow}>
        <TouchableOpacity onPress={handleShowSettings}>
          <Feather
            name="settings"
            size={24}
            color={THEMES.PRIMARY}
            style={{ marginRight: 16 }}
          />
        </TouchableOpacity>
      </View>
      {showSettings === true && <SettingPopup closeBtn={handleHideSettings} />}
      <View style={styles.userCard}>
        <Feather
          name="edit"
          size={24}
          color={THEMES.PRIMARY}
          style={styles.edit}
        />
        <Image
          style={styles.image}
          source={{
            uri: user.avatar,
          }}
        />
        <Text style={styles.name}>
          {user.firstname} {user.lastname}
        </Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.statTitleBlock}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="folder-outline"
              size={24}
              color={THEMES.WHITE}
            />
          </View>
          <Text style={styles.statTitle}>
            {trad[lang].stats.totalProjects}
            {"\n"}
            {trad[lang].stats.workedOn}
          </Text>
        </View>
        <Text style={styles.value}>{projects.length}</Text>
      </View>

      <Btn
        title={trad[lang].common.logout}
        color={THEMES.PRIMARY}
        textColor={THEMES.WHITE}
        action={() => handleLogOut()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  userCard: {
    position: "relative",
    width: "80%",
    backgroundColor: THEMES.WHITE,
    borderRadius: 6,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
    marginBottom: "10%",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 120,
    borderWidth: 4,
    borderColor: THEMES.PRIMARY,
    resizeMode: "contain",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: THEMES.PRIMARY,
    marginTop: 16,
  },
  email: {
    fontSize: 16,
    fontWeight: "bold",
    color: THEMES.PRIMARY,
    opacity: 0.7,
    marginTop: 8,
  },
  edit: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  statsCard: {
    width: "80%",
    backgroundColor: THEMES.WHITE,
    borderRadius: 6,
    padding: 16,
    alignItems: "center",
    marginBottom: "10%",
  },
  statTitleBlock: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  iconContainer: {
    backgroundColor: THEMES.PRIMARY,
    borderRadius: 6,
    padding: 12,
  },
  statTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: THEMES.PRIMARY,
    marginLeft: 8,
    lineHeight: 24,
    textTransform: "uppercase",
  },
  value: {
    fontSize: 96,
    fontWeight: "bold",
    color: THEMES.PRIMARY,
  },
  settingsRow: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default Profile;
