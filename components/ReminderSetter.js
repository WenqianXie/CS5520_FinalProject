// Purpose: This file creates a modal that allows users to set a reminder for a specific date and time.

import { Platform, View, Text, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import TextButton from "./TextButton";
import createLocalNotification from "../helper/CreateLocalNotification";

const ReminderSetter = ({
  reminderInfo,
  dateTime,
  changeDateTime,
  keepOpen,
}) => {
  const [iosPickerVisible, setIosPickerVisible] = useState(false);
  const [dateTimePickerMode, setDateTimePickerMode] = useState("date");

  // This function is called when the user changes the date or time in the picker
  const onDateTimePickerChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    changeDateTime(currentDate);
    setIosPickerVisible(false);
  };

  // This function is called when the user presses the "Set Date" or "Set Time" button
  const callPicker = (mode) => {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      setIosPickerVisible(true);
      setDateTimePickerMode(mode);
    } else {
      Alert.alert("Only Support IOS or Android");
    }
  };

  const callDatePicker = () => {
    callPicker("date");
  };
  const callTimePicker = () => {
    callPicker("time");
  };
  const cancelSettingReminderHandler = () => {
    keepOpen(false);
  };
  const confirmSettingReminderHandler = () => {
    createLocalNotification(dateTime, reminderInfo);
    keepOpen(false);
  };

  return (
    <View style={reminderSetterStyles.modal}>
      <View style={reminderSetterStyles.reminderSettingBanner}>
        <Text>Create Your Reminder</Text>
        <View style={reminderSetterStyles.reminderSettingButtonRow}>
          <TextButton onPress={callDatePicker}>
            <Text>Set Date</Text>
          </TextButton>

          <TextButton onPress={callTimePicker}>
            <Text>Set Time</Text>
          </TextButton>
        </View>

        {iosPickerVisible && (
          <DateTimePicker
            value={dateTime}
            mode={dateTimePickerMode}
            is24Hour={true}
            onChange={onDateTimePickerChange}
          />
        )}

        <Text>Do you want to set a reminder at</Text>
        <Text>{dateTime.toLocaleString()}</Text>

        <View style={reminderSetterStyles.reminderSettingButtonRow}>
          <TextButton onPress={cancelSettingReminderHandler}>
            <Text>Cancel</Text>
          </TextButton>

          <TextButton onPress={confirmSettingReminderHandler}>
            <Text>Confirm</Text>
          </TextButton>
        </View>
      </View>
    </View>
  );
};

export default ReminderSetter;

export const reminderSetterStyles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0)", // Transparent background
  },
  reminderSettingButtonRow: {
    flexDirection: "row",
  },
  reminderSettingBanner: {
    alignSelf: "center",
    width: "60%",
    height: "35%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 10,
  },
});
