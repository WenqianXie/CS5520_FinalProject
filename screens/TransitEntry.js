import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { styles } from "../helper/HelperStyles";
import React from "react";

const detailsContent = {
  title: "Hospital",
  contents: [
    {
      subtitle: "Emergency",
      content: "Call 911",
    },
    {
      subtitle: "Non-Emergency",
      content: "Call 311",
    },
  ],
};

const TransitEntry = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/transportation.png")}
        style={styles.backgroundPic}
      ></ImageBackground>
      <View style={styles.bottomRow}>
        {/* Family Doctor */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { detailsContent: detailsContent })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/metro.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>Take Metro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { detailsContent: detailsContent })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/bus.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>Take Bus</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { detailsContent: detailsContent })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/seabus.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>Take A Seabus</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { detailsContent: detailsContent })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/bike.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>Ride A Share Bike</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransitEntry;
