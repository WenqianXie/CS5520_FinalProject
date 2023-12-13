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

// const detailsContent = {
//   title: "Medical Service Plan",
//   contents: [
//     {
//       subtitle: "Emergency",
//       content: "Call 911",
//     },
//     {
//       subtitle: "Non-Emergency",
//       content: "Call 311",
//     },
//   ],
// };

const driverLicense = {
  title: "Get a driver license",
  contents: [
    {
      subtitle: "If you are new drivers",
      content:
        "- First step: Get your L license (on or after your 16th birthday)",
    },
    { content: "- What is L license? Kowledge test + vision creening!" },
    {
      link: {
        title: "- Book your knowledge test",
        url: "https://www.icbc.com/driver-licensing/visit-dl-office/Book-a-knowledge-test-and-other-services",
      },
    },
    {
      content:
        "- Second step: Get your N license (after 12 months of L license)",
    },
    {
      content:
        "- What is N license? 1 year with supervisor + Class 7 road test!",
    },
    {
      link: {
        title: "- Book your road test",
        url: "https://onlinebusiness.icbc.com/webdeas-ui/home",
      },
    },
    {
      content:
        "- Third step: Get your full license (after 24 months of N license)",
    },
    {
      content:
        "- What is full license? 2 years with N license + Class 5 road test!",
    },
    {
      link: {
        title: "- Book your road test",
        url: "https://onlinebusiness.icbc.com/webdeas-ui/home",
      },
    },
    {
      subtitle: "If you are new to BC",
    },
    {
      content:
        "- If you have a valid driver's license from another country, you can use it for 90 days. ",
    },
    { content: "- After 90 days, you need to get a BC driver's license." },
    {
      link: {
        title: "- Book your road test",
        url: "https://onlinebusiness.icbc.com/webdeas-ui/home",
      },
    },
  ],
};

const SIN = {
  title: "Apply for Social Insurance Number",
  contents: [
    {
      subtitle: "What is Social Insurance Number (SIN)?",
      content:
        "- To work in Canada or access government programs and benefits, you need a 9-digit number known as a Social Insurance Number (SIN).",
    },
    { content: "- You can apply for a SIN online or by mail." },
    {
      link: {
        title: "Apply online",
        url: "https://www.canada.ca/en/employment-social-development/services/sin/apply.html",
      },
    },
    {
      link: {
        title: "Apply by mail",
        url: "https://www.canada.ca/en/employment-social-development/services/sin/eligible.html",
      },
    },
  ],
};

const BCServicesCard = {
  title: "BC Services Card",
  contents: [
    {
      subtitle: "What is BC Services Card?",
      content:
        "- The BC Services Card is a government-issued identification assigned to BC residents that provides access to government services",
    },
    { content: "- You have three options:" },
    { content: "- Get a combined BC Driver's License and Services Card." },
    { content: "- Get a Pohto BC Services Card." },
    { content: "- Get a Non-Photo BC Services Card." },

    {
      link: {
        title: "- Apply for BC Services Card",
        url: "https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card",
      },
    },
  ],
};

const EssentialDocsEntry = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/essential.png")}
        style={styles.backgroundPic}
      />

      <View style={styles.bottomRow}>
        {/* MSP */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Details", { topic: "msp" })}
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
          onPress={() =>
            navigation.navigate("Details", { topic: "driverLicense" })
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
          onPress={() => navigation.navigate("Details", { topic: "SIN" })}
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/photo_id_2.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>{EntryButtonTextHelper("SIN")}</Text>
        </TouchableOpacity>

        {/* Photo ID */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { topic: "BCServicesCard" })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/photo_id_1.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>
            {EntryButtonTextHelper("BCServicesCard")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EssentialDocsEntry;
