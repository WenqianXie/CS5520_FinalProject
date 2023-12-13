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

const compassCard = {
  title: "Get A Compass Card",
  constents: [
    {
      subtitle: "What is Compass Card?",
      content:
        "- Compass Cards are convenient, reloadable fare cards that can be used when taking transit within Metro Vancouver.",
    },
    {
      content:
        "- Compass Cards can be loaded with Stored Value, or with prepaid passes (such as Monthly and DayPasses). Stored Value can be used to pay for single fares, DayPasses, and add-ons such as the YVR AddFare. Passes can be used for unlimited travel within the selected zones and time period.",
    },
    {
      subtitle: "How compass card works?",
      content:
        "- Tap your card on the reader when entering buses, HandyDART, and at the gates when entering and exiting SkyTrain stations or SeaBus terminals.",
    },
    {
      content:
        "- The fare is automatically deducted from the stored value on your card.",
    },
    {
      content:
        "- You can also use your Compass Card to transfer between SkyTrain, SeaBus and West Coast Express.",
    },
    {
      subtitle: "Where to get a compass card?",
      content:
        "- Compass Cards can be purchased at Compass Vending Machines located at all SkyTrain, SeaBus and West Coast Express stations.",
    },
    {
      content: "- It requires a $6 refundable deposit. Also ... you can",
    },
    {
      link: {
        title: "- Purchase Online",
        url: "https://www.compasscard.ca/OrderCard",
      },
    },
    {
      subtitle: "- Wait.. If you are a student!",
      content:
        "- U-Passes are available to students enrolled in participating universities only, they are linked to the Compass Card.",
    },
    {
      content:
        "- U-passes offer lower transit fares across all zones–including unlimited use of bus, SkyTrain and SeaBus services within Metro Vancouver.",
    },
    {
      link: {
        title: "- Purchase a U-Pass",
        url: "https://upassbc.translink.ca/",
      },
    },
  ],
};

const skyTrain = {
  title: "Taking the SkyTrain",
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
      link: {
        title: "- Purchase a compass card",
        url: "https://www.translink.ca/transit-fares/where-to-buy",
      },
    },
    { content: "- Or if you are a student, you can purchase a U-Pass!" },
    {
      link: {
        title: "- Purchase a U-Pass",
        url: "https://upassbc.translink.ca/",
      },
    },
    { content: "- Or you can simply tap your credit card!" },
    {
      content:
        "- Find out your SkyTrain stations nearby and tap your card on the card reader!",
    },
    {
      webview:
        "https://www.google.com/maps/d/viewer?mid=1KyVPelPCtKalIehQ9DV3DLyaCM1NaYj2&femb=1&ll=49.22669719438806%2C-123.00673110909199&z=12",
    },
  ],
};

const bus = {
  title: "Using the Bus",
  contents: [
    {
      subtitle: "What is Bus?",
      content:
        "- Buses connect all neighbourhoods of Vancouver and run frequently. All buses are equipped with accessibility measures for wheelchairs and strollers. ",
    },
    {
      content:
        "- Children 12 and under can ride TransLink services free of charge!",
    },
    {
      subtitle: "How to take a Bus?",
      link: {
        title: "- Purchase a compass card",
        url: "https://www.translink.ca/transit-fares/where-to-buy",
      },
    },
    { content: "- Or if you are a student, you can purchase a U-Pass!" },

    {
      link: {
        title: "- Purchase a U-Pass",
        url: "https://upassbc.translink.ca/",
      },
    },
    { content: "- Or you can simply tap your credit card!" },
  ],
};

const seabus = {
  title: "Using the Seabus",
  contents: [
    {
      subtitle: "What is Seabus?",
      content:
        "- The SeaBus is a passenger-only ferry service in Metro Vancouver, British Columbia, Canada. It crosses Burrard Inlet to connect the cities of Vancouver and North Vancouver.",
    },
    {
      content:
        "- Children 12 and under can ride TransLink services free of charge!",
    },
    {
      subtitle: "How to take a Bus?",
      // content:
      //   "- Compass Cards are convenient, reloadable fare cards that can be used when taking transit within Metro Vancouver.",
      link: {
        title: "- Purchase a compass card",
        url: "https://www.translink.ca/transit-fares/where-to-buy",
      },
    },
    {
      // content:
      //   "- U-Passes are available to students enrolled in participating universities only, they are linked to the Compass Card",
      link: {
        title: "- Purchase a U-Pass",
        url: "https://upassbc.translink.ca/",
      },
    },
    { content: "- Or you can simply tap your credit card!" },
    {
      subtitle: "Where to take a Seabus?",
      content:
        "- Waterfront Station, a main transit hub for all forms of Vancouver public transit. ",
    },
    { content: "- 601 W Cordova St, Vancouver, BC V6B 1G1" },
    {
      image: "infoDataImages/seabus_map.png",
      map: {
        markersList: [
          {
            coordinate: {
              latitude: 49.28706,
              longitude: -123.108894,
            },
            title: "Waterfront SeaBus Terminal",
            icon: "directions-boat",
          },
          {
            coordinate: {
              latitude: 49.309636,
              longitude: -123.083865,
            },
            title: "Lonsdale Quay SeaBus Terminal",
            icon: "directions-boat",
          },
        ],
        style: null,
      },
    },
  ],
};

const TransitEntry = ({ navigation }) => {
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
          onPress={
            () => navigation.navigate("Details", { topic: "skyTrain" })
            // navigation.navigate('Details', {detailsContent: skyTrain, category: "transit", docID: "skyTrain"})
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
          onPress={() => navigation.navigate("Details", { topic: "bus" })}
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
          onPress={() => navigation.navigate("Details", { topic: "seabus" })}
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
