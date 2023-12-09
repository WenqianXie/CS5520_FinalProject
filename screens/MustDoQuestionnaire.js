import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import Checkbox from "expo-checkbox";
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { database, auth } from "../firebase/FirebaseSetup";
import { writeToUsersDB } from "../firebase/FirebaseHelper";
import { colors } from "../helper/HelperColors";
import TextButton from "../components/TextButton";

const Questionnaire = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [submitLoading, setSubmitLoading] = useState(false); // State to track submit status
  const [lengthInCanada, setLengthInCanada] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [studentWork, setStudentWork] = useState(null);
  const [comeWithFamily, setComeWithFamily] = useState(null);
  const [drive, setDrive] = useState(null);
  const [needPublicTransportation, setNeedPublicTransportation] =
    useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // a valid user is logged in
        setIsLoggedIn(true);
      } else {
        //before authentication or after logout
        setIsLoggedIn(false);
      }
    });
  }, []);

  useEffect(() => {
    // Ensure currentUser is available
    if (!auth.currentUser) return;

    const userQuery = query(
      collection(database, "users"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(
      userQuery,
      (querySnapshot) => {
        // Handle the empty snapshot case
        if (querySnapshot.empty) {
          console.log("No matching documents.");
          return;
        }

        querySnapshot.forEach((docSnap) => {
          const userData = docSnap.data();
          if (userData && userData.userSelection) {
            setLengthInCanada(userData.userSelection.lengthInCanada);
            setOccupation(userData.userSelection.occupation);
            setStudentWork(userData.userSelection.studentWork);
            setDrive(userData.userSelection.drive);
            setComeWithFamily(userData.userSelection.comeWithFamily);
            setNeedPublicTransportation(
              userData.userSelection.needPublicTransportation
            );
          }
        });
      },
      (error) => {
        // Error handling
        console.error("Error fetching user data:", error);
      }
    );

    // Cleanup function
    return () => unsubscribe();
  }, [auth.currentUser]);

  const questions = [
    {
      id: "1",
      question: "How long have you been in Canada?",
      options: [
        "Planning to move",
        "Just arrived - 3 months",
        "More than 3 months",
      ],
      answer: lengthInCanada,
      setAnswer: setLengthInCanada,
    },
    {
      id: "2",
      question: "What is your occupation?",
      options: ["Student", "Worker", "Traveller"],
      answer: occupation,
      setAnswer: setOccupation,
    },
    {
      id: "3",
      question:
        "If you are a student, do you want to work on campus or find a part-time job?",
      options: ["Yes", "No", "I am not a student"],
      answer: studentWork,
      setAnswer: setStudentWork,
    },
    {
      id: "4",
      question: "Do you come with your family?",
      options: ["Yes", "No"],
      answer: comeWithFamily,
      setAnswer: setComeWithFamily,
    },
    {
      id: "5",
      question: "Do you drive or plan to drive?",
      options: ["Yes", "No"],
      answer: drive,
      setAnswer: setDrive,
    },
    {
      id: "6",
      question: "Do you want to get access public transportation?",
      options: ["Yes", "No"],
      answer: needPublicTransportation,
      setAnswer: setNeedPublicTransportation,
    },
    // Add more questions as needed
  ];

  const renderQuestion = ({ item }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.question}>{item.question}</Text>
      {item.options.map((option, index) => (
        <View key={index} style={styles.optionContainer}>
          <Checkbox
            value={item.answer === option}
            onValueChange={(newValue) => {
              if (newValue) {
                item.setAnswer(option);
              }
            }}
            color={item.answer === option ? "#4630EB" : undefined}
          />
          <Text style={styles.option}>{option}</Text>
        </View>
      ))}
    </View>
  );

  const handleSubmit = async () => {
    if (isLoggedIn) {
      setSubmitLoading(true); // Set loading to true while we submit the questionnaire
      await writeToUsersDB({
        userSelection: {
          lengthInCanada,
          occupation,
          studentWork,
          comeWithFamily,
          drive,
          needPublicTransportation,
        },
      });
      setSubmitLoading(false); // Set loading to false once we have submitted the questionnaire
      navigation.replace("MustDoList");
    } else {
      Alert.alert(
        "Authentication Required",
        "Please log in to submit your answer",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Confirm",
            onPress: () => {
              // Navigate to the Login page
              // Assuming you are using React Navigation
              navigation.navigate("Auth", { screen: "LogIn" });
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!isLoggedIn && (
        <View style={styles.reminderContainer}>
          <Text style={styles.reminderText}>
            Please log in to save your answers, or your answers won't be saved.
          </Text>
        </View>
      )}
      <FlatList
        data={questions}
        renderItem={renderQuestion}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => (
          <TextButton onPress={handleSubmit}>
            <Text>Submit</Text>
          </TextButton>
        )}
        ListFooterComponentStyle={{
          padding: 10,
          alignItems: "center",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  option: {
    fontSize: 16,
    marginLeft: 10,
  },
  reminderContainer: {
    backgroundColor: "#ffcccb", // Light red for visibility, adjust as needed
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  reminderText: {
    fontSize: 16,
    color: "black", // Adjust color as needed
  },
});

export default Questionnaire;
