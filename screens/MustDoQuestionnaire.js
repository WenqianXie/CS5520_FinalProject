import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Checkbox from "expo-checkbox";
import { database, auth } from "../firebase/FirebaseSetup";
import { writeToUsersDB } from "../firebase/FirebaseHelper";
import { colors } from "../helper/HelperColors";
import { FontAwesome5 } from '@expo/vector-icons'; 
import TextButton from "../components/TextButton";

const MustDoQuestionnaire = ({ navigation, route }) => {
  const { questionType } = route.params;
  const [submitLoading, setSubmitLoading] = useState(false); // State to track submit status
  const [lengthInCanada, setLengthInCanada] = useState('');
  const [occupation, setOccupation] = useState('');

  if(auth.currentUser){
    useEffect(() => {
      const userQuery = query(
        collection(database, "users"),
        where("userId", "==", auth.currentUser.uid)
      );

      const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach((docSnap) => {
            if("userSelection" in docSnap.data()) {
              setLengthInCanada(docSnap.data().userSelection.lengthInCanada); // Set the lengthInCanada state to the fetched data));
              setOccupation(docSnap.data().userSelection.occupation); // Set the occupation state to the fetched data));
            }
          });
        } 
      });

      return () => unsubscribe(); // Cleanup on unmount
    }, []); // Empty dependency array means this effect runs once after the component mounts
  }

  const handleCheckboxChange = (option) => {
    if (questionType === "lengthInCanada") {
      setLengthInCanada(option);
    } else if (questionType === "occupation") {
      setOccupation(option);
    }
  };

  const handleNext = () => {
      navigation.navigate("MustDo", {
        questionType: "occupation",
      });
  };

  const handlePrevious = () => {
    navigation.navigate("MustDo", {
      questionType: "lengthInCanada",
    });
  };

  const handleSubmit = async () => {
    setSubmitLoading(true); // Set loading to true while we submit the questionnaire
    await writeToUsersDB({ userSelection: { lengthInCanada, occupation } });
    setSubmitLoading(false); // Set loading to false once we have submitted the questionnaire
    navigation.navigate("MustDoList");
  }


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

      {questionType === "lengthInCanada" && (
      <FontAwesome5 
        name="arrow-circle-right"
        size={24}
        color="black"
        onPress={handleNext}
        style={styles.submitIcon}
      />
      )}

      {questionType === "occupation" && (
        <>
          <FontAwesome5 
          name="arrow-circle-left"
          size={24}
          color="black"
          onPress={handlePrevious}
          style={styles.previousIcon}
          />
          <TextButton onPress={handleSubmit}>
            {!submitLoading ? (
              <Text>Submit</Text>
            ) : (
                <ActivityIndicator size="small" color={colors.themeDark} />
            )}
          </TextButton>
        </>
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
