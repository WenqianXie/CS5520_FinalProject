import { View, Alert, Platform, Modal, StyleSheet, Text} from "react-native";
import { useState } from "react";
import React from "react";
import IconButton from "./IconButton";
import TextButton from "./TextButton";



function NotificationReminder({title, body, data, currentMode='time'}) {
  const [dateTime, setDateTime] = useState(new Date()); // default date and time is now
  const [dateTimePickerVisible, setDateTimePickerVisible] = useState(false); // show the date and time picker on IOS
  const [dateTimeToString, setDateTimeToString] = useState("")
  



  return (
    <View>
      

      
    </View>
  );
}