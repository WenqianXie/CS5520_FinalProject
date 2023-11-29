import { View, Text, ImageBackground } from 'react-native'
import { styles } from '../helper/HelperStyles'
import React from 'react'

const EssentialDocsEntry = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/essential.png")}
        style={styles.backgroundPic}
      >
      <Text>Essential</Text>
      </ImageBackground>
    </View>
  )
}

export default EssentialDocsEntry