import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Btn from "../common/Btn";
import trad from "../../lang/trad.json";
import BorderBtn from "../common/BorderBtn";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { statusChecker } from "../../utils/utils";
// import DatePicker from "react-native-date-picker";
import { API_URL, THEMES } from "../../../constants";
import { UserContext } from "../../contexts/UserProvider";
import React, { useContext, useEffect, useState } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const ProjectEdition = ({ projectId, close }) => {
  const { lang, user } = useContext(UserContext);
  const username = user.firstname + " " + user.lastname;
  const [newContributor, setNewContributor] = useState("");
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [editForm, setEditForm] = useState({
    name: "",
    manager: "",
    contributors: [],
    creationDate: "",
    dueDate: "",
    lastUpdate: "",
    status: "",
    description: "",
  });

  // GET PROJECT BY ID
  const getProjectById = async () => {
    try {
      const data = await axios
        .get(`${API_URL}/projects/${projectId}`)
        .then((result) => {
          setProject(result.data.data);
          setEditForm(result.data.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProjectById();
  }, [projectId]);

  // ADD CONTRIBUTOR
  const addContributor = () => {
    setEditForm({
      ...editForm,
      contributors: [...editForm.contributors, newContributor],
    });
    setNewContributor("");
  };

  // REMOVE CONTRIBUTOR
  const removeContributor = (index) => {
    editForm.contributors.splice(index, 1);
    setEditForm({ ...editForm });
  };

  // UPDATE PROJECT
  const updateProject = async () => {
    try {
      const data = await axios
        .put(`${API_URL}/projects/${projectId}`, { ...editForm })
        .then((result) => {
          close(false);
        });
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

  return (
    <ScrollView
      style={styles.background}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{trad[lang].projects.projectEdition}</Text>
        {project.manager === username ? (
          <TextInput
            keyboardType="default"
            style={styles.input}
            value={editForm.name}
            placeholder={trad[lang].projects.enterProjectName}
            placeholderTextColor={THEMES.PRIMARY}
            onChangeText={(text) => setEditForm({ ...editForm, name: text })}
          />
        ) : (
          <Text style={styles.notInput}>{project.name}</Text>
        )}

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
        {editForm?.contributors.length >= 1 && (
          <View style={styles.memberContainer}>
            {editForm.contributors.map((member, index) => (
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
          value={editForm.dueDate}
          onChangeText={(date) => setEditForm({ ...editForm, dueDate: date })}
          autoComplete="birthdate-full"
          placeholder={trad[lang].projects.defineDueDate}
        />
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={5}
          value={editForm.description}
          placeholderTextColor={THEMES.PRIMARY}
          onChangeText={(text) =>
            setEditForm({ ...editForm, description: text })
          }
          placeholder={trad[lang].projects.addDescription}
        />

        <View style={styles.statusBlock}>
          <View style={styles.currentStatusRow}>
            <Text style={styles.currentStatusLabel}>
              {trad[lang].projects.currentStatus} :
            </Text>
            <View style={styles.currentStatus}>
              {statusChecker(project.status, lang)}
            </View>
          </View>
          <View style={styles.divider}></View>
          {project.manager === username && (
            <View>
              <View>
                <Text style={styles.editStatusLabel}>
                  {trad[lang].projects.editStatus} :
                </Text>
              </View>
              <View style={styles.editStatusRow}>
                <TouchableOpacity
                  style={
                    editForm.status === "Done"
                      ? {
                          borderColor: THEMES.PRIMARY,
                          borderWidth: 2,
                          borderRadius: 24,
                        }
                      : null
                  }
                  onPress={() => setEditForm({ ...editForm, status: "Done" })}
                >
                  <View style={styles.done}>
                    <Octicons name="dot-fill" size={12} color="green" />
                    <Text style={styles.doneText}>
                      {trad[lang].statusChecker.done}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    editForm.status === "In progress"
                      ? {
                          borderColor: THEMES.PRIMARY,
                          borderWidth: 2,
                          borderRadius: 24,
                        }
                      : null
                  }
                  onPress={() =>
                    setEditForm({ ...editForm, status: "In progress" })
                  }
                >
                  <View style={styles.inProgress}>
                    <Octicons name="dot-fill" size={12} color="#a47e1b" />
                    <Text style={styles.inProgressText}>
                      {trad[lang].statusChecker.inProgress}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    editForm.status === "Not Started"
                      ? {
                          borderColor: THEMES.PRIMARY,
                          borderWidth: 2,
                          borderRadius: 24,
                        }
                      : null
                  }
                  onPress={() =>
                    setEditForm({ ...editForm, status: "Not Started" })
                  }
                >
                  <View style={styles.notStarted}>
                    <Octicons name="dot-fill" size={12} color="red" />
                    <Text style={styles.notStartedText}>
                      {trad[lang].statusChecker.notStarted}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <View style={styles.buttonsRow}>
          <BorderBtn
            title={trad[lang].common.cancel}
            color={THEMES.WHITE}
            textColor={THEMES.PRIMARY}
            borderColor={THEMES.PRIMARY}
            marginRight={16}
            action={() => close(false)}
          />
          {editForm?.name.length > 0 &&
          editForm?.dueDate.length > 0 &&
          editForm?.description.length > 0 ? (
            <Btn
              title={trad[lang].common.save}
              color={THEMES.PRIMARY}
              textColor={THEMES.WHITE}
              action={() => updateProject()}
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
    paddingVertical: 20,
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
  notInput: {
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
  statusBlock: {
    width: "90%",
  },
  currentStatusRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  currentStatusLabel: {
    color: THEMES.PRIMARY,
    fontSize: 14,
    marginRight: 8,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: THEMES.PRIMARY,
    marginVertical: 8,
  },
  editStatusLabel: {
    color: THEMES.PRIMARY,
    fontSize: 14,
    marginBottom: 8,
  },
  done: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 24,
    backgroundColor: "rgba(12, 189, 14, 0.2)",
  },
  inProgress: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 24,
    backgroundColor: "rgba(209, 171, 16, 0.2)",
  },
  notStarted: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 24,
    backgroundColor: "rgba(209, 16, 22, 0.2)",
  },
  doneText: {
    color: "green",
    fontSize: 12,
    marginLeft: 4,
  },
  inProgressText: {
    color: "#a47e1b",
    fontSize: 12,
    marginLeft: 4,
  },
  notStartedText: {
    color: "red",
    fontSize: 12,
    marginLeft: 4,
  },
  editStatusRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default ProjectEdition;
