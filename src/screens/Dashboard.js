import axios from "axios";
import trad from "../lang/trad.json";
import { Octicons } from "@expo/vector-icons";
import { API_URL, THEMES } from "../../constants";
import { UserContext } from "../contexts/UserProvider";
import ProjectCard from "../components/projects/ProjectCard";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { statusChecker } from "../utils/utils";

const Dashboard = () => {
  const { user, lang } = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const [currentProjects, setCurrentProjects] = useState([]);

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
    setCurrentProjects(projects.slice(0, 3));
  }, [projects]);

  return (
    <View style={styles.container}>
      {/* CURRENT PROJECTS */}
      <View style={styles.projectsBlock}>
        <Text style={styles.projectsTitle}>
          {trad[lang].dashboard.currentProjects}
        </Text>
        {projects.length > 0 && (
          <FlatList
            data={currentProjects}
            horizontal={true}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ProjectCard
                name={item.name}
                manager={item.manager}
                dueDate={item.dueDate}
                status={statusChecker(item.status, lang)}
              />
            )}
          />
        )}
      </View>
      {/* CURRENT TASKS */}
      <View style={styles.tasksBlock}>
        <Text style={styles.tasksTitle}>
          {trad[lang].dashboard.currentTasks}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  projectsBlock: {
    width: "100%",
    marginVertical: 20,
  },
  projectsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: THEMES.PRIMARY,
    marginLeft: 8,
    marginBottom: 12,
  },
  tasksBlock: {
    width: "100%",
  },
  tasksTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: THEMES.PRIMARY,
    marginLeft: 8,
    marginBottom: 12,
  },
});

export default Dashboard;
