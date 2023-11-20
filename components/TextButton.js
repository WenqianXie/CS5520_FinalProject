import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { styles } from "../helper/HelperStyles";

export default function TextButton({
  children,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => {
        return [styles.textButton, pressed && styles.buttonOnPress];
      }}
    >
      {children}
    </Pressable>
  );
}

