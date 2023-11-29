import { View, Text, ImageBackground } from 'react-native'
import { styles } from '../helper/HelperStyles'
import React from 'react'

const TransitEntry = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/transportation.png")}
        style={styles.backgroundPic}
      >
      <Text>MedicineEntry</Text>
      </ImageBackground>
    </View>
  )
}

export default TransitEntry