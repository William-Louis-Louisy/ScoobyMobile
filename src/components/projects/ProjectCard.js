import trad from "../../lang/trad.json";
import React, { useContext } from "react";
import { THEMES } from "../../../constants";
import { UserContext } from "../../contexts/UserProvider";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const ProjectCard = ({ name, manager, dueDate, status }) => {
  const { lang } = useContext(UserContext);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.projectName}>{name}</Text>
      </View>

      <View style={styles.dataBlock}>
        <View style={styles.dataRow1}>
          <Text style={styles.dataLabel}>
            {trad[lang].projectCard.managedBy} :
          </Text>
          <Text style={styles.dataLabel}>{manager}</Text>
        </View>
        <View style={styles.dataRow2}>
          <Text style={styles.dataLabel}>
            {trad[lang].projectCard.dueDate} :
          </Text>
          <Text style={styles.dataLabel}>{dueDate}</Text>
        </View>
        <View style={styles.shiftedRow}>
          <View style={styles.dataRow3}>
            <Text style={styles.dataLabel}>
              {trad[lang].projectCard.status} :
            </Text>
            <View>{status}</View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 6,
    margin: 8,
    backgroundColor: THEMES.WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  projectName: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "500",
    color: THEMES.PRIMARY,
  },
  dataBlock: {
    borderTopColor: THEMES.PRIMARY,
    borderTopWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  dataRow1: {
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dataRow2: {
    marginBottom: 24,

    flexDirection: "row",
    justifyContent: "space-between",
  },
  dataRow3: {
    marginBottom: 24,

    flexDirection: "row",
    justifyContent: "space-between",
  },
  dataLabel: {
    color: THEMES.PRIMARY,
    fontWeight: "400",
    marginRight: 16,
  },
  shiftedRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default ProjectCard;
