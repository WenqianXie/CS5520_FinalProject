// Purpose: This file creates a button with an icon and text.

import { Text, Pressable } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { colors } from '../helper/HelperColors';
import React from 'react'
import { styles } from '../helper/HelperStyles';
import { FONTSIZE_CONTROLLER } from '../helper/Constants';

const IconButton = ({onPress, type, text="", scale=1, position=null, textStyle=null}) => {
  let fontScale = 1;
  //control the scalling of the fontSize
  if (scale < 1){
    fontScale = scale/FONTSIZE_CONTROLLER;
  }
  else if (scale > 1){
    fontScale = scale*FONTSIZE_CONTROLLER;
  }

  //This component could be compatible to multiple types of icons
  let buttonStyle = null;
  let iconButton = null;
  switch (type){
    case "arrow":
      buttonStyle = styles.arrowButton;
      iconButton = <FontAwesome5 name="location-arrow" size={30*scale} color={colors.themeLight} />;
      break;
    case "close":
      buttonStyle = styles.closeButton;
      iconButton = <AntDesign name="close" size={24*scale} color="white" />;
      break;
    case "reminder":
      buttonStyle = styles.reminderButton;
      iconButton = <AntDesign name="calendar" size={24*scale} color={colors.themeDark} />;
      break;
  }
  return (
    <Pressable
      onPress={onPress}
      style={({pressed})=>[
        pressed && (styles.buttonOnPress),
        position,
        buttonStyle
      ]}>

      {iconButton}
      
      {text !== "" && 
        <Text 
          style={[
            {...styles.arrowButtonText, fontSize: fontScale*styles.arrowButtonText.fontSize}, 
            textStyle
            ]}
        >
          {text}
        </Text>
      }
    </Pressable>
  )
}

export default IconButton