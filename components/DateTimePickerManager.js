import { Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import React from 'react'

const DateTimePickerManager = ({currentMode, dateTime, passDateTime}) => {

	const onDateTimePickerChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		passDateTime(currentDate)
	};

	switch(Platform.OS){
		case 'ios':
			return (
				<DateTimePicker
          value={dateTime}
          mode={currentMode}
          is24Hour={true}
          onChange={onDateTimePickerChange}
        />)
		case 'android':
			DateTimePickerAndroid.open({ 
        value: dateTime,
        onDateTimePickerChange,
        mode: currentMode,  
        is24Hour: true,
      })
			break;
		default:
			Alert.alert("Only Support IOS or Android")
			break;
	}
}

export default DateTimePickerManager
