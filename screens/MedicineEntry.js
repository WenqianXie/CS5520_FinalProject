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
import IconButton from "../components/IconButton";

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
        {/* Removed the "Go Details" button */}
      </ImageBackground>
      <View style={styles.bottomRow}>
        {/* Family Doctor */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { requestedMap: requestedMap })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/family_doctor.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>Find Family Doctor</Text>
        </TouchableOpacity>

        {/* Pharmacy */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { requestedMap: requestedMap })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/medicine_icon.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>Find Pharmacy</Text>
        </TouchableOpacity>

        {/* Hospital */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { requestedMap: requestedMap })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/hospital.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>Find Hospital</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default MedicineEntry;
