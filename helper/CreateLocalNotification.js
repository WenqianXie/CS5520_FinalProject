import * as Notifications from "expo-notifications";

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


const createLocalNotification = async (dateTime, title, body, data) => {
 
try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give permission to send notification");
        return;
      }
      
      if(dateTime){
        Notifications.scheduleNotificationAsync({
          content: {
            title: title,
            body: body,
            data: data,
          },
          trigger: dateTime,
        })
      }
    } catch (err) {
      console.log("schedule notification error ", err);
    }
}

export default createLocalNotification