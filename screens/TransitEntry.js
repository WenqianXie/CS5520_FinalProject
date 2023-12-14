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

const TransitEntry = ({ navigation }) => {
  // this is the entry page for transit related topics
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/transportation.png")}
        style={styles.backgroundPic}
      />

      <View style={styles.bottomRow}>
        {/* Compass / UPass */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { topic: "compassCard" })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/pass.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>
            {EntryButtonTextHelper("compassCard")}
          </Text>
        </TouchableOpacity>

        {/* SkyTrain */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { topic: "skyTrain" })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/metro.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>
            {EntryButtonTextHelper("skyTrain")}
          </Text>
        </TouchableOpacity>

        {/* Bus */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { topic: "bus" })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/bus.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>{EntryButtonTextHelper("bus")}</Text>
        </TouchableOpacity>

        {/* Seabus */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { topic: "seabus" })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/seabus.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>{EntryButtonTextHelper("seabus")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransitEntry;
