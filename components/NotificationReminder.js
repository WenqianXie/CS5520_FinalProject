import { View, Alert, Platform, Modal, StyleSheet, Text} from "react-native";
import { useState } from "react";
import React from "react";
import * as Notifications from "expo-notifications";
import IconButton from "./IconButton";
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import TextButton from "./TextButton";

const verifyPermission = async () => {
  const status = await Notifications.getPermissionsAsync();
  if (status.granted) {
    return true;
  }
  const response = await Notifications.requestPermissionsAsync({
    ios: { allowBadge: true },
  });
  return response.granted;
};

export default function NotificationReminder({title, body, data, currentMode='time'}) {
  const [dateTime, setDateTime] = useState(new Date()); // default date and time is now
  const [dateTimePickerVisible, setDateTimePickerVisible] = useState(false); // show the date and time picker on IOS
  const [dateTimeToString, setDateTimeToString] = useState("")

  const onDateTimePickerChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateTime(currentDate);
  }; 
  
  const createNotification = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: data,
      },
      trigger: dateTime,
    })
  }

  const confirmHandler = () => {
    setDateTimePickerVisible(false)
    createNotification();
  }

  const cancelHandler = () => {
    setDateTimePickerVisible(false)
  }


  const scheduleNotificationHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give permission to send notification");
        return;
      }
      setDateTimePickerVisible(true)
      if(dateTimePickerVisible){
        switch (Platform.OS){
          case 'ios':
            break; //do nothing here on IOS
          case 'android':
            DateTimePickerAndroid.open({ 
              value: dateTime,
              onDateTimePickerChange,
              mode: currentMode,  
              is24Hour: true,
            })
          default:
            setDateTimePickerVisible(false)
            Alert.alert("Only Support IOS or Android")
        }
      }
    } catch (err) {
      console.log("schedule notification error ", err);
    }
  };

  return (
    <View>
      <View style={notificationReminderStyles.modal}>
        <Modal
          transparent={false}
          animationType="fade"
          visible={dateTimePickerVisible}
        >
          <Text>Do you want to set a reminder at</Text>
          <Text>{dateTime.toTimeString()}</Text>
          
          {dateTimePickerVisible && (
            <DateTimePicker
              value={dateTime}
              mode={currentMode}
              is24Hour={true}
              onChange={onDateTimePickerChange}
            />)
          }
          
          <View style={notificationReminderStyles.modalButtons}>
            <TextButton onPress={cancelHandler}>
              <Text>Cancel</Text>
            </TextButton>

            <TextButton onPress={confirmHandler}>
              <Text>Confirm</Text>
            </TextButton>
          </View>
        </Modal>
      </View>

      <IconButton
        onPress={scheduleNotificationHandler}
        type="reminder"
      />
    </View>
  );
}
const notificationReminderStyles = StyleSheet.create({
  modal: {
    alignItems: "center",
    justifyContent: "space-around"
  },
  modalButtons:{
    flexDirection: "row"
  }
})