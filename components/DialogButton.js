// Purpose: This file creates a button that is used in the dialog box.

import { View, Text, Pressable, ImageBackground } from 'react-native'
import React from 'react'
import { styles } from '../helper/HelperStyles'
import { FONTSIZE_CONTROLLER } from '../helper/Constants'

const DialogButton = ({onPress, text, scale=1, position}) => {
  let fontScale = 1;
  //control the scalling of the fontSize
  if (scale < 1){
    fontScale = scale/FONTSIZE_CONTROLLER;
  }
  else if (scale > 1){
    fontScale = scale*FONTSIZE_CONTROLLER;
  }

  //This component could be scaled to any size
  return (
    <Pressable
      onPress={onPress}
      style={({pressed})=>[
        {...styles.dialogButton, height: scale*styles.dialogButton.height, width: scale*styles.dialogButton.width},
        pressed && (styles.buttonOnPress),
        position
      ]}>
      <ImageBackground source={require("../assets/dialog.png")} style={styles.dialogBackgroundPic} resizeMode='contain'>
        <View style={styles.dialogTextContainer}>
          <Text style={{...styles.dialogButtonText, fontSize: fontScale*styles.dialogButtonText.fontSize}}>{text}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  )
}

export default DialogButton