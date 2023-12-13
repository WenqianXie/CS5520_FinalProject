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
  return (
    <Pressable
      onPress={onPress}
      style={({pressed})=>[
        pressed && (styles.buttonOnPress),
        position,
        type === "arrow" ? (
          {...styles.arrowButton, height: scale*styles.arrowButton.height, width: scale*styles.arrowButton.width})
        : (
          styles.closeButton
        )
      ]}>
      {
        type === "arrow" &&
        <FontAwesome5 name="location-arrow" size={30*scale} color={colors.themeLight} />
      }
      {
        type === "close" &&
        <AntDesign name="close" size={24*scale} color="white" />
      }
      {
        type === "reminder" &&
        <AntDesign name="calendar" size={24*scale} color={colors.themeDark} />
      }

      <Text 
        style={[
          {...styles.arrowButtonText, fontSize: fontScale*styles.arrowButtonText.fontSize}, 
          textStyle
          ]}
      >
        {text}
      </Text>
    </Pressable>
  )
}

export default IconButton