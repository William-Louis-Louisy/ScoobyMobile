import { StyleSheet, Text, View } from "react-native";
import trad from "../lang/trad.json";
import { Octicons } from "@expo/vector-icons";
import { UserContext } from "../contexts/UserProvider";
import { useContext } from "react";

// STATUS CHECKER
export const statusChecker = (status, lang) => {
  switch (status) {
    case "Done":
      return (
        <View style={statusCheckerStyles.done}>
          <Octicons name="dot-fill" size={12} color="green" />
          <Text style={statusCheckerStyles.doneText}>
            {trad[lang].statusChecker.done}
          </Text>
        </View>
      );
    case "In progress":
      return (
        <View style={statusCheckerStyles.inProgress}>
          <Octicons name="dot-fill" size={12} color="#a47e1b" />
          <Text style={statusCheckerStyles.inProgressText}>
            {trad[lang].statusChecker.inProgress}
          </Text>
        </View>
      );
    case "Not Started":
      return (
        <View style={statusCheckerStyles.notStarted}>
          <Octicons name="dot-fill" size={12} color="red" />
          <Text style={statusCheckerStyles.notStartedText}>
            {trad[lang].statusChecker.notStarted}
          </Text>
        </View>
      );
  }
};

const statusCheckerStyles = StyleSheet.create({
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
});
