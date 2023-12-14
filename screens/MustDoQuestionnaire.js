import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import Checkbox from "expo-checkbox";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/FirebaseSetup";
import {
  writeToUsersDB,
  readFromUsersDB,
  writeToBookmarksDB,
} from "../firebase/FirebaseHelper";
import TextButton from "../components/TextButton";
import { questionnaireStyles } from "../helper/HelperStyles";

const Questionnaire = ({ navigation, route }) => {
  // this is the questionnaire page for users to generate their must-do list automatically

  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [readDataLoading, setReadDataLoading] = useState(true); // State to track reading status
  const [submitLoading, setSubmitLoading] = useState(false); // State to track submitting status

  const [lengthInCanada, setLengthInCanada] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [studentWork, setStudentWork] = useState(null);
  const [comeWithFamily, setComeWithFamily] = useState(null);
  const [drive, setDrive] = useState(null);
  const [needPublicTransportation, setNeedPublicTransportation] = useState(null);

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
  }, [auth.currentUser]);

  useEffect(() => {
    const getUserSelection = async () => {
      // Ensure currentUser is available
      try {
        if (isLoggedIn) { // If user is logged in, read the userSelection from the database
          setReadDataLoading(true); // Set loading to true while we fetch the userSelection
          const userSelection = await readFromUsersDB("userSelection");
          if (userSelection) { // If userSelection exists, set the userSelection state to the fetched data
            setLengthInCanada(userSelection.lengthInCanada);
            setOccupation(userSelection.occupation);
            setStudentWork(userSelection.studentWork);
            setDrive(userSelection.drive);
            setComeWithFamily(userSelection.comeWithFamily);
            setNeedPublicTransportation(userSelection.needPublicTransportation);
          }
        } else {
          // If user is not logged in, set the userSelection state to the passed in data if any
          if (route.params?.userSelection) {
            setLengthInCanada(route.params.userSelection.lengthInCanada);
            setOccupation(route.params.userSelection.occupation);
            setStudentWork(route.params.userSelection.studentWork);
            setDrive(route.params.userSelection.drive);
            setComeWithFamily(route.params.userSelection.comeWithFamily);
            setNeedPublicTransportation(
              route.params.userSelection.needPublicTransportation
            );
          }
        }
        setReadDataLoading(false);
      } catch (err) {
        console.log("Error from getting remote userSelection of quiz: ", err);
      }
    };
    getUserSelection();
  }, [isLoggedIn, auth.currentUser]); // only run this effect when the user is logged in

  // Questionnaire questions
  const questions = [
    {
      id: "1",
      question: "How long do you plan to stay in Canada?",
      options: ["Less than 3 months", "More than 3 months"],
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

  const renderQuestion = ({ item }) => {
    if (item.id === "3" && occupation !== "Student") {
      return null;
    } else {
      return (
        <View style={questionnaireStyles.questionContainer}>
          <Text style={questionnaireStyles.question}>{item.question}</Text>
          {item.options.map((option, index) => (
            <View key={index} style={questionnaireStyles.optionContainer}>
              <Checkbox
                value={item.answer === option}
                onValueChange={(newValue) => {
                  if (newValue) {
                    item.setAnswer(option);
                  }
                }}
                color={item.answer === option ? "#4630EB" : undefined}
              />
              <Text style={questionnaireStyles.option}>{option}</Text>
            </View>
          ))}
        </View>
      );
    }
  };

  // Generate the mustDoList based on the user's answers
  const generateMustDoList = () => {
    let mustDoList = [];

    if (lengthInCanada === "More than 3 months" && occupation !== "Traveller") {
      mustDoList.push("msp");
    }

    if (occupation === "Worker" || studentWork === "Yes") {
      mustDoList.push("sin");
    }

    if (drive === "Yes") {
      mustDoList.push("driverLicense");
    }

    if (needPublicTransportation === "Yes") {
      mustDoList.push("compassCard");
    }

    if (mustDoList.length === 0) {
      mustDoList.push("nothing");
    }

    return mustDoList;
  };

  const handleSubmit = async () => {
    const userSelection = {
      userSelection: {
        lengthInCanada,
        occupation,
        studentWork,
        comeWithFamily,
        drive,
        needPublicTransportation,
      },
    };
    const mustDoList = { generatedMustDoList: generateMustDoList() };

    if (isLoggedIn) {
      setSubmitLoading(true); // Set loading to true while we submit the questionnaire
      await writeToUsersDB({
        ...userSelection,
      });
      await writeToBookmarksDB({
        ...mustDoList,
      });
      setSubmitLoading(false); // Set loading to false once we have submitted the questionnaire
      navigation.replace("MustDoList");
    } else {
      //If user is not logged in, pass the userSelection and generated mustDoList to "MustDoList" Screen
      navigation.replace("MustDoList", {
        ...userSelection,
        ...mustDoList,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!isLoggedIn && (
        <View style={questionnaireStyles.reminderContainer}>
          <Text style={questionnaireStyles.reminderText}>Log in to save your answers</Text>
        </View>
      )}

      {readDataLoading ? (
        <Text>Loading</Text>
      ) : (
        <FlatList
          data={questions}
          renderItem={renderQuestion}
          keyExtractor={(item) => item.id}
          ListFooterComponent={() => (
            <TextButton onPress={handleSubmit}>
              {submitLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text>Submit</Text>
              )}
            </TextButton>
          )}
          ListFooterComponentStyle={{
            padding: 10,
            alignItems: "center",
          }}
        />
      )}
    </View>
  );
};

export default Questionnaire;
