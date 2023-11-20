import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { writeToUsersDB } from "../firebase/FirebaseHelper";
import { MaterialIcons } from "@expo/vector-icons";

const MustDoQuestionnaire = ({ navigation, route }) => {
  const { questionType } = route.params;

  const [lengthInCanada, setLengthInCanada] = useState(null);
  const [occupation, setOccupation] = useState(null);

  const handleCheckboxChange = (option) => {
    if (questionType === "lengthInCanada") {
      setLengthInCanada(option);
    } else if (questionType === "occupation") {
      setOccupation(option);
    }
  };

  const handleSubmit = async () => {
    if (questionType === "lengthInCanada") {
      navigation.navigate("MustDo", {
        questionType: "occupation",
      });
    } else {
      await writeToUsersDB({ userSelection: { lengthInCanada, occupation } });
    }
  };

  const handlePrevious = () => {
    navigation.navigate("MustDo", {
      questionType: "lengthInCanada",
    });
  };

  return (
    <View style={styles.container}>
      {questionType === "lengthInCanada" && (
        <>
          <Text style={styles.question}>How long have you been in Canada?</Text>
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
        </>
      )}
      {questionType === "occupation" && (
        <>
          <Text style={styles.question}>What is your occupation?</Text>

          <View style={styles.optionContainer}>
            <Checkbox
              value={occupation === "Student"}
              onValueChange={() => handleCheckboxChange("Student")}
            />
            <Text
              style={styles.optionText}
              onPress={() => handleCheckboxChange("Student")}
            >
              Student
            </Text>
          </View>

          <View style={styles.optionContainer}>
            <Checkbox
              value={occupation === "Worker"}
              onValueChange={() => handleCheckboxChange("Worker")}
            />
            <Text
              style={styles.optionText}
              onPress={() => handleCheckboxChange("Worker")}
            >
              Worker
            </Text>
          </View>

          <View style={styles.optionContainer}>
            <Checkbox
              value={occupation === "Traveller"}
              onValueChange={() => handleCheckboxChange("Traveller")}
            />
            <Text
              style={styles.optionText}
              onPress={() => handleCheckboxChange("Traveller")}
            >
              Traveller
            </Text>
          </View>
        </>
      )}

      <MaterialIcons
        name="navigate-next"
        size={24}
        color="black"
        onPress={handleSubmit}
        style={styles.submitIcon}
      />

      {questionType === "occupation" && (
        <MaterialIcons
          name="navigate-before"
          size={24}
          color="black"
          onPress={handlePrevious}
          style={styles.previousIcon}
        />
      )}
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
