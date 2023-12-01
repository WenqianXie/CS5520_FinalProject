import { View, Text, ImageBackground, Button} from 'react-native'
import React from 'react'
import { styles } from '../helper/HelperStyles'


const MedicineEntry = ({navigation}) => {
  const requestedMap = {
    initialRegion: {
      latitude: 42.3601,
      longitude: -71.0589,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    markersList: [
      {
        coordinate: {
          latitude: 42.3601,
          longitude: -71.0589,
        },
        title: "This is a Marker's Title",
      },
    ],
    style: null,
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/medicine.png")}
        style={styles.backgroundPic}
      >
      <Text>MedicineEntry</Text>
      <Button title="Go Details" onPress={() => navigation.navigate("Details", {requestedMap: requestedMap})}/>
      </ImageBackground>
    </View>
  )
}

export default MedicineEntry