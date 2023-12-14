import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { styles } from "../helper/HelperStyles";
import React from "react";
import EntryButtonTextHelper from "../helper/EntryButtonTextHelper";

const EssentialDocsEntry = ({ navigation }) => {
  // this is the entry page for essential documents related topics
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/essential.png")}
        style={styles.backgroundPic}
      />

      <View style={styles.bottomRow}>
        {/* MSP */}
        <TouchableOpacity
          onPress={
            () => navigation.navigate("Details", { topic: "msp" })}
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/medical_insurance.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>{EntryButtonTextHelper("msp")}</Text>
        </TouchableOpacity>

        {/* Driver License */}
        <TouchableOpacity
          onPress={
            () => navigation.navigate("Details", { topic: "driverLicense" })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/driver_license.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>
            {EntryButtonTextHelper("driverLicense")}
          </Text>
        </TouchableOpacity>

        {/* SIN */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { topic: "sin" })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/photo_id_2.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>{EntryButtonTextHelper("sin")}</Text>
        </TouchableOpacity>

        {/* BC Services Card */}
        <TouchableOpacity
          onPress={
            () => navigation.navigate("Details", { topic: "bcServicesCard" })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/photo_id_1.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>
            {EntryButtonTextHelper("bcServicesCard")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EssentialDocsEntry;
