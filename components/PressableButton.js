import { Pressable, StyleSheet } from "react-native";
import React from "react";

export default function PressableButton({
  children,
  pressedFunction,
  pressedStyle,
  defaultStyle,
}) {
  return (
    <Pressable
      onPress={pressedFunction}
      style={({ pressed }) => {
        return [styles.styleByDefault, defaultStyle, pressed && pressedStyle];
      }}
      // pressRetentionOffset={{ top: 10, left: 10, bottom: 10, right: 10 }}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  styleByDefault: {
    backgroundColor: "beige",
  },
});
