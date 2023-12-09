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
      map: requestedMap,
      link: {
        title: "Boston 311",
        url: "https://www.boston.gov/departments/311",
      },
    },
  ],
};

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

const skyTrain = {
  title: "Using the SkyTrain",
  contents: [
    {
      subtitle: "What is SkyTrain?",
      content:
        "- SkyTrain is the medium-capacity rapid transit system serving the Metro Vancouver region in British Columbia, Canada.",
    },
    {
      content:
        "- Children 12 and under can ride TransLink services free of charge!",
    },
    {
      subtitle: "How to take a SkyTrain?",
      content:
        "- Compass Cards are convenient, reloadable fare cards that can be used when taking transit within Metro Vancouver.",
      link: {
        title: "- Purchase a compass card",
        url: "https://www.translink.ca/transit-fares/where-to-buy",
      },
    },
    {
      content:
        "- U-Passes are available to students enrolled in participating universities only, they are linked to the Compass Card",
      link: {
        title: "- Purchase a U-Pass",
        url: "https://upassbc.translink.ca/",
      },
    },
    {
      content: "- Find out your SkyTrain stations nearby",
      map: requestedMap,
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
            navigation.navigate("Details", { detailsContent: skyTrain })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/metro.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>Take SkyTrain</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { detailsContent: skyTrain })
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
          <Text style={styles.iconText}>Take Seabus</Text>
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
          <Text style={styles.iconText}>Ride Share Bike</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransitEntry;
