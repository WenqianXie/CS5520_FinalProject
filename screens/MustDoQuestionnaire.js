import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { writeToUsersDB } from "../firebase/FirebaseHelper";
import { MaterialIcons } from "@expo/vector-icons";

const MustDoQuestionnaire = () => {
  const [lengthInCanada, setLengthInCanada] = useState(null);

  const handleCheckboxChange = (option) => {
    setLengthInCanada(option);
  };

  const handleSubmit = async () => {
    await writeToUsersDB({ userSelection: lengthInCanada });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        How long have you been arrived in Canada?
      </Text>

      <View style={styles.optionContainer}>
        <Checkbox
          value={lengthInCanada === "planningToMove"}
          onValueChange={() => handleCheckboxChange("planningToMove")}
        />
        <Text
          style={styles.optionText}
          onPress={() => handleCheckboxChange("planningToMove")}
        >
          I am planning to move to Canada
        </Text>
      </View>
      <View style={styles.optionContainer}>
        <Checkbox
          value={lengthInCanada === "JustArrived"}
          onValueChange={() => handleCheckboxChange("JustArrived")}
        />
        <Text
          style={styles.optionText}
          onPress={() => handleCheckboxChange("JustArrived")}
        >
          Just arrived - 6 months
        </Text>
      </View>
      <MaterialIcons
        name="navigate-next"
        size={24}
        color="black"
        onPress={handleSubmit}
        style={styles.submitIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 8,
  },
  submitIcon: {
    alignSelf: "flex-end",
    marginTop: 20,
  },
});

export default MustDoQuestionnaire;
