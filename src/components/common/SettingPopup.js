import React, { useContext } from "react";
import trad from "../../lang/trad.json";
import { THEMES } from "../../../constants";
import { UserContext } from "../../contexts/UserProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const SettingPopup = ({ closeBtn }) => {
  const { lang, storeLang } = useContext(UserContext);

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity onPress={closeBtn} style={styles.button}>
          <MaterialCommunityIcons
            name="close"
            size={24}
            color={THEMES.PRIMARY}
          />
        </TouchableOpacity>

        <Text style={styles.title}>{trad[lang].common.settings}</Text>

        <View style={styles.settingBox}>
          <Text style={{ marginBottom: 6, color: THEMES.SECONDARY }}>
            {trad[lang].common.chooseLanguage}:
          </Text>
          <View style={styles.langField}>
            <View style={styles.flagRow}>
              <TouchableOpacity
                style={
                  lang === "fr"
                    ? { backgroundColor: THEMES.ACCENT, borderRadius: 6 }
                    : null
                }
                onPress={() => storeLang("fr")}
              >
                <Image
                  style={styles.flag}
                  source={require("../../assets/flags/france.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  lang === "en"
                    ? { backgroundColor: THEMES.ACCENT, borderRadius: 6 }
                    : null
                }
                onPress={() => storeLang("en")}
              >
                <Image
                  style={styles.flag}
                  source={require("../../assets/flags/united-kingdom.png")}
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={
                  lang === "sp"
                    ? { backgroundColor: THEMES.ACCENT, borderRadius: 6 }
                    : null
                }
                onPress={() => storeLang("sp")}
              >
                <Image
                  style={styles.flag}
                  source={require("../../assets/flags/spain.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  lang === "it"
                    ? { backgroundColor: THEMES.ACCENT, borderRadius: 6 }
                    : null
                }
                onPress={() => storeLang("it")}
              >
                <Image
                  style={styles.flag}
                  source={require("../../assets/flags/italy.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  lang === "de"
                    ? { backgroundColor: THEMES.ACCENT, borderRadius: 6 }
                    : null
                }
                onPress={() => storeLang("de")}
              >
                <Image
                  style={styles.flag}
                  source={require("../../assets/flags/germany.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  lang === "cn"
                    ? { backgroundColor: THEMES.ACCENT, borderRadius: 6 }
                    : null
                }
                onPress={() => storeLang("cn")}
              >
                <Image
                  style={styles.flag}
                  source={require("../../assets/flags/china.png")}
                />
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgba(18,18,18,0.9)",
    flex: 1,
    position: "absolute",
    zIndex: 2000,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "90%",
    borderRadius: 6,
    padding: 8,
    borderWidth: 1,
    borderColor: THEMES.PRIMARY,
    backgroundColor: THEMES.WHITE,
    alignItems: "center",
    shadowColor: THEMES.SECONDARY,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    position: "relative",
  },
  button: {
    position: "absolute",
    right: 6,
    top: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: THEMES.SECONDARY,
  },
  settingBox: {
    width: "100%",
    padding: 8,
    marginVertical: 8,
  },
  flag: {
    width: 40,
    height: 24,
    margin: 8,
  },
  langField: {
    width: "100%",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
  flagRow: {
    flexDirection: "row",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    width: "100%",
    marginHorizontal: 8,
  },
});

export default SettingPopup;
