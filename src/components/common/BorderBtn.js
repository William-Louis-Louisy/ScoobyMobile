import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const BorderBtn = ({
  title,
  action,
  color,
  textColor,
  borderColor,
  marginRight,
}) => {
  return (
    <TouchableOpacity onPress={action}>
      <View
        style={{
          backgroundColor: color,
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: borderColor,
          marginRight: marginRight,
        }}
      >
        <Text style={{ color: textColor, textAlign: "center" }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BorderBtn;
