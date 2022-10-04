import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import axios from "axios";
import Btn from "../common/Btn";
import trad from "../../lang/trad.json";
import BorderBtn from "../common/BorderBtn";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
// import DatePicker from "react-native-date-picker";
import { API_URL, THEMES } from "../../../constants";
import { UserContext } from "../../contexts/UserProvider";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const ProjectCreation = ({ close, refetch }) => {
  const { lang, user } = useContext(UserContext);
  const [newContributor, setNewContributor] = useState("");
  // const [date, setDate] = useState(new Date());
  const [createForm, setCreateForm] = useState({
    name: "",
    manager: user.firstname + " " + user.lastname,
    contributors: [user.email],
    creationDate: new Date().toLocaleDateString(),
    dueDate: "",
    lastUpdate: Date.now(),
    status: "Not Started",
    description: "",
  });

  // ADD CONTRIBUTOR
  const addContributor = () => {
    setCreateForm({
      ...createForm,
      contributors: [...createForm.contributors, newContributor],
    });
    setNewContributor("");
  };

  // REMOVE CONTRIBUTOR
  const removeContributor = (index) => {
    createForm.contributors.splice(index, 1);
    setCreateForm({ ...createForm });
  };

  // POST PROJECT
  const postProject = async () => {
    try {
      const data = await axios
        .post(`${API_URL}/projects`, { ...createForm })
        .then((result) => {
          setCreateForm({
            name: "",
            manager: user.firstname + " " + user.lastname,
            contributors: [user.email],
            creationDate: new Date().toLocaleDateString(),
            dueDate: "",
            lastUpdate: Date.now(),
            status: "Not Started",
            description: "",
          });
          Toast.show({
            type: "success",
            text1: trad[lang].toasts.success,
            text2: trad[lang].toasts.userConnected,
            position: "top",
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 80,
          });
          close(false);
          refetch();
        });
      return data;
    } catch (err) {
      Toast.show({
        type: "error",
        text1: trad[lang].toasts.oops,
        text2: trad[lang].toasts.somethingWentWrong,
        position: "top",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 80,
      });
      console.error(err);
    }
  };

  return (
    <ScrollView
      style={styles.background}
      contentContainerStyle={{
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{trad[lang].projects.projectCreation}</Text>
        <TextInput
          keyboardType="default"
          style={styles.input}
          placeholder={trad[lang].projects.enterProjectName}
          placeholderTextColor={THEMES.PRIMARY}
          onChangeText={(text) => setCreateForm({ ...createForm, name: text })}
        />
        <View style={styles.memberInputContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor={THEMES.PRIMARY}
            onChangeText={(e) => setNewContributor(e)}
            value={newContributor}
            keyboardType="email-address"
            placeholder={trad[lang].projects.addCollaborator}
          />
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => addContributor()}
          >
            <Ionicons name="person-add" size={24} color={THEMES.PRIMARY} />
          </TouchableOpacity>
        </View>
        {createForm.contributors.length >= 1 && (
          <View style={styles.memberContainer}>
            {createForm.contributors.map((member, index) => (
              <View key={index} style={styles.newMember}>
                <TouchableOpacity onPress={() => removeContributor(index)}>
                  <Ionicons name="close-circle" size={16} color="black" />
                </TouchableOpacity>
                <Text style={{ marginLeft: 6, marginBottom: 3, fontSize: 12 }}>
                  {member}
                </Text>
              </View>
            ))}
          </View>
        )}
        {/* <DatePicker date={date} onDateChange={setDate} /> */}
        <TextInput
          style={styles.input}
          placeholderTextColor={THEMES.PRIMARY}
          onChangeText={(date) =>
            setCreateForm({ ...createForm, dueDate: date })
          }
          autoComplete="birthdate-full"
          placeholder={trad[lang].projects.defineDueDate}
        />
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={5}
          placeholderTextColor={THEMES.PRIMARY}
          onChangeText={(text) =>
            setCreateForm({ ...createForm, description: text })
          }
          placeholder={trad[lang].projects.addDescription}
        />
        <View style={styles.buttonsRow}>
          <BorderBtn
            title={trad[lang].common.cancel}
            color={THEMES.WHITE}
            textColor={THEMES.PRIMARY}
            borderColor={THEMES.PRIMARY}
            marginRight={16}
            action={() => close(false)}
          />
          {createForm.name.length > 0 &&
          createForm.dueDate.length > 0 &&
          createForm.description.length > 0 ? (
            <Btn
              title={trad[lang].common.save}
              color={THEMES.PRIMARY}
              textColor={THEMES.WHITE}
              action={() => postProject()}
            />
          ) : (
            <Text style={styles.warning}>
              {trad[lang].projects.fillAllFields}
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgba(18,18,18,0.9)",
    flex: 1,
    position: "absolute",
    zIndex: 2000,
    width: "100%",
    height: Dimensions.get("window").height,
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: THEMES.PRIMARY,
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: THEMES.PRIMARY,
    color: THEMES.PRIMARY,
    borderRadius: 6,
    marginBottom: 16,
    width: "90%",
    padding: 6,
  },
  memberInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  addBtn: {
    marginLeft: -40,
    width: 40,
    marginBottom: 16,
  },
  newMember: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d3d3d3",
    borderRadius: 50,
    paddingLeft: 6,
    paddingRight: 12,
    paddingVertical: 3,
    marginBottom: 4,
    marginHorizontal: 4,
  },
  memberContainer: {
    width: "90%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "90%",
    marginVertical: 16,
  },
  warning: {
    color: THEMES.WARNING,
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ProjectCreation;
