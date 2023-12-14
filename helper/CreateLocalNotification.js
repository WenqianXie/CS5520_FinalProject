import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

// This function is used to schedule a local notification
const verifyPermission = async () => {
  // check if we have permission to send notifications
  const status = await Notifications.getPermissionsAsync();
  if (status.granted) {
    return true;
  }
  const response = await Notifications.requestPermissionsAsync({
    ios: { allowBadge: true },
  });
  return response.granted;
};


// It takes in a date time object and a reminderInfo object
const createLocalNotification = async (dateTime, reminderInfo) => {
try {
  const hasPermission = await verifyPermission();
  if (!hasPermission) {
    Alert.alert("You need to give permission to send notification");
    return;
  }
      
  if(dateTime){
    await Notifications.scheduleNotificationAsync({
      content: {
        title: reminderInfo.title,
        body: reminderInfo.body,
        data: reminderInfo.data,
      },
      trigger: dateTime,
    })
    Alert.alert("Notification Scheduled at\n" + dateTime.toLocaleString());
  }
} catch (err) {
  console.log("schedule notification error ", err);
}
}

export default createLocalNotification