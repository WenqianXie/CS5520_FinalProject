import {
  View,
  Text,
  ImageBackground,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { styles } from "../helper/HelperStyles";

const MedicineEntry = ({ navigation }) => {
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
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/medicine.png")}
        style={styles.backgroundPic}
      >
        <Text>MedicineEntry</Text>
        <Button
          title="Go Details"
          onPress={() =>
            navigation.navigate("Details", { requestedMap: requestedMap })
          }
        />
      </ImageBackground>
      <View style={styles.bottomRow}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MedDoc")}
          activeOpacity={0.7} // Decreases the opacity of the image when touched
        >
          <Image
            source={require("../assets/family_doctor.png")}
            style={styles.footerImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("MedDoc")}
          activeOpacity={0.7}
        >
          <Image
            source={require("../assets/medicine_icon.png")}
            style={styles.footerImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("MedDoc")}
          activeOpacity={0.7}
        >
          <Image
            source={require("../assets/hospital.png")}
            style={styles.footerImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MedicineEntry;
