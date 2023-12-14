import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { styles } from "../helper/HelperStyles";
import EntryButtonTextHelper from "../helper/EntryButtonTextHelper";

const MedicineEntry = ({ navigation }) => {
  // this is the entry page for medicine related topics

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/medicine.png")}
        style={styles.backgroundPic}
      />

      <View style={styles.bottomRow}>
        {/* MSP */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { topic: "msp" })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/healthcare_card.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>{EntryButtonTextHelper("msp")}</Text>
        </TouchableOpacity>

        {/* Hospital */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { topic: "hospital" })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/hospital.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>
            {EntryButtonTextHelper("hospital")}
          </Text>
        </TouchableOpacity>

        {/* Pharmacy */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { topic: "pharmacy" })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/medicine_icon.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>
            {EntryButtonTextHelper("pharmacy")}
          </Text>
        </TouchableOpacity>

        {/* Family Doctor */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { topic: "familyDoctor" })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/family_doctor.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>
            {EntryButtonTextHelper("familyDoctor")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default MedicineEntry;
