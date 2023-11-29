import { View, Text, ImageBackground  } from 'react-native'
import React from 'react'
import { styles } from '../helper/HelperStyles'

const MedicineEntry = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/medicine.png")}
        style={styles.backgroundPic}
      >
      <Text>MedicineEntry</Text>
      </ImageBackground>
    </View>
  )
}

export default MedicineEntry