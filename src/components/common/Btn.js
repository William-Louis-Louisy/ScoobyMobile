import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Btn = ({ title, action, color, textColor }) => {
  return (
    <TouchableOpacity onPress={action}>
      <View
        style={{
          backgroundColor: color,
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 6,
        }}
      >
        <Text style={{ color: textColor, textAlign: "center" }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Btn;
