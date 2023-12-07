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
  title: "Medical Service Plan",
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

const EssentialDocsEntry = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/essential.png")}
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
            source={require("../assets/medical_insurance.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>Get Medical Service Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { detailsContent: detailsContent })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/driver_license.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>Get Driver License</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { detailsContent: detailsContent })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/photo_id_2.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>Get Social Insurance Number</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { detailsContent: detailsContent })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/photo_id_1.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>Get Photo ID</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EssentialDocsEntry;
