import { View, Text, Pressable, ImageBackground } from 'react-native'
import React from 'react'
import { styles } from '../helper/HelperStyles'

const DialogButton = ({onPress, text, scale=1, position}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed})=>[
        {...styles.dialogButton, height: scale*styles.dialogButton.height, width: scale*styles.dialogButton.width},
        pressed && (styles.dialogButtonOnPress),
        position
      ]}>
      <ImageBackground source={require("../assets/dialog.png")} style={styles.dialogBackgroundPic} resizeMode='contain'>
        <View style={styles.dialogTextContainer}>
          <Text style={styles.dialogButtonText}>{text}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  )
}

export default DialogButton