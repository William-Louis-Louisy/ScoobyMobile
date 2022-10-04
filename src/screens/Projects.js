import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import Checkbox from "expo-checkbox";
import trad from "../lang/trad.json";
import Btn from "../components/common/Btn";
import { statusChecker } from "../utils/utils";
import { API_URL, THEMES } from "../../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { UserContext } from "../contexts/UserProvider";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import ProjectCreation from "../components/projects/ProjectCreation";
import ProjectEdition from "../components/projects/ProjectEdition";

const Projects = () => {
  const navigation = useNavigation();
  const [projectId, setProjectId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const { user, lang } = useContext(UserContext);
  const [doneFilter, setDoneFilter] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [managedFilter, setManagedFilter] = useState(false);

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

  // FILTER PROJECTS
  useEffect(() => {
    setFilteredList(projects);
  }, [projects]);

  // USEEFFECT DISPLAYS PROJECTS ACCORDING TO ACTIVE FILTER
  useEffect(() => {
    if (managedFilter && doneFilter) {
      setFilteredList(
        projects.filter(
          (project) =>
            project.manager === user.firstname + " " + user.lastname &&
            project.status === "Done"
        )
      );
    }
    if (managedFilter) {
      setFilteredList(
        projects.filter(
          (project) => project.manager === user.firstname + " " + user.lastname
        )
      );
    }
    if (doneFilter) {
      setFilteredList(projects.filter((project) => project.status !== "Done"));
    }
    if (!managedFilter && !doneFilter) {
      setFilteredList(projects);
    }
  }, [managedFilter, doneFilter]);

  // DELETE PROJECT
  const deleteProject = async (id) => {
    try {
      const data = await axios
        .delete(`${API_URL}/projects/${id}`)
        .then((result) => {
          Toast.show({
            type: "success",
            text1: trad[lang].toasts.success,
            text2: trad[lang].toasts.projectDeleted,
            position: "top",
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 80,
          });
          getProjects();
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

  // HANDLE EDIT PROJECT
  const handleEdit = (id) => {
    setProjectId(id);
    setIsEditOpen(true);
  };

  return (
    <ScrollView
      style={{
        height: Dimensions.get("window").height,
      }}
    >
      <View style={styles.container}>
        {isOpen && <ProjectCreation close={setIsOpen} refetch={getProjects} />}
        {isEditOpen && (
          <ProjectEdition close={setIsEditOpen} projectId={projectId} />
        )}
        <View style={styles.btnRow}>
          <Btn
            title={trad[lang].common.newProject}
            color={THEMES.PRIMARY}
            textColor={THEMES.WHITE}
            action={() => setIsOpen(true)}
          />
        </View>
        <View style={styles.cbxRow}>
          <View style={styles.cbx}>
            <Checkbox
              style={styles.checkbox}
              value={managedFilter}
              onValueChange={setManagedFilter}
            />
            <Text style={styles.cbxLabel}>
              {trad[lang].projects.managedByMe}
            </Text>
          </View>
          <View style={styles.cbx}>
            <Checkbox
              style={styles.checkbox}
              value={doneFilter}
              onValueChange={setDoneFilter}
            />
            <Text style={styles.cbxLabel}>{trad[lang].projects.hideDone}</Text>
          </View>
        </View>
        <View style={styles.tblRow}>
          <View style={styles.tblHeader}>
            <Text style={styles.tblHeaderTitle}>{trad[lang].common.name}</Text>
            <Text style={styles.tblHeaderStatus}>
              {trad[lang].common.status}
            </Text>
            <Text style={styles.tblHeaderEdit}>
              {trad[lang].common.actions}
            </Text>
          </View>
          {filteredList.length > 0 &&
            filteredList.map((item, index) => (
              <View key={index} style={styles.tblCellRow}>
                <View style={styles.tblCell}>
                  <Text style={styles.tblCell}>{item.name}</Text>
                </View>
                <View style={styles.tblCell}>
                  {statusChecker(item.status, lang)}
                </View>
                <View style={styles.tblActionsCell}>
                  <TouchableOpacity
                    style={styles.edit}
                    onPress={() => handleEdit(item._id)}
                  >
                    <MaterialIcons
                      name="edit"
                      size={18}
                      color={THEMES.PRIMARY}
                    />
                  </TouchableOpacity>
                  {item.manager === user.firstname + " " + user.lastname ? (
                    <TouchableOpacity
                      style={styles.delete}
                      onPress={() => deleteProject(item._id)}
                    >
                      <MaterialIcons
                        name="delete-forever"
                        size={20}
                        color="white"
                      />
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.notAllowed}>
                      <MaterialIcons
                        name="delete-forever"
                        size={20}
                        color="white"
                      />
                    </View>
                  )}
                </View>
              </View>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 20,
    paddingHorizontal: 20,
    width: "100%",
  },
  cbxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "100%",
  },
  tblRow: {
    width: "100%",
  },
  cbx: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
  cbxLabel: {
    fontSize: 14,
  },
  tblHeader: {
    flexDirection: "row",
    backgroundColor: THEMES.PRIMARY,
  },
  tblHeaderTitle: {
    paddingVertical: 12,
    width: Dimensions.get("window").width * 0.35,
    textAlign: "center",
    // borderRightColor: THEMES.SECONDARY,
    // borderRightWidth: 1,
    color: THEMES.WHITE,
  },
  tblHeaderStatus: {
    paddingVertical: 12,
    width: Dimensions.get("window").width * 0.35,
    textAlign: "center",
    // borderRightColor: THEMES.SECONDARY,
    // borderRightWidth: 1,
    color: THEMES.WHITE,
  },
  tblHeaderEdit: {
    paddingVertical: 12,
    width: Dimensions.get("window").width * 0.3,
    textAlign: "center",
    color: THEMES.WHITE,
  },
  tblCellRow: {
    flexDirection: "row",
    borderBottomColor: THEMES.PRIMARY,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  tblCell: {
    width: Dimensions.get("window").width * 0.35,
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    // borderRightColor: THEMES.SECONDARY,
    // borderRightWidth: 1,
    color: THEMES.PRIMARY,
  },
  tblActionsCell: {
    width: Dimensions.get("window").width * 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  edit: {
    padding: 4,
    marginRight: 8,
  },
  delete: {
    padding: 4,
    backgroundColor: THEMES.WARNING,
    borderRadius: 4,
    marginLeft: 8,
  },
  notAllowed: {
    padding: 4,
    backgroundColor: "#d6d6d6",
    borderRadius: 4,
    marginLeft: 8,
  },
});

export default Projects;
