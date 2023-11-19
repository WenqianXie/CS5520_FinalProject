import { View, Text, Pressable } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { colors } from '../helper/HelperColors';
import React from 'react'
import { styles } from '../helper/HelperStyles';

const ArrowButton = ({onPress, text, scale=1, position}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed})=>[
        {...styles.arrowButton, height: scale*styles.arrowButton.height, width: scale*styles.arrowButton.width},
        pressed && (styles.buttonOnPress),
        position
      ]}>
      <FontAwesome5 name="location-arrow" size={30*scale} color={colors.themeLight} />
      <Text style={styles.arrowButtonText}>{text}</Text>
    </Pressable>
  )
}

export default ArrowButton