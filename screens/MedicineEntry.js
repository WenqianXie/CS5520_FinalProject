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
import EntryButtonTextHelper from "../helper/EntryButtonTextHelper";

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
        }
      },
    ],
  };

  const msp = {
    title: "Applying for MSP",
    contents : [
      {
        subtitle: "What is MSP?",
        content: "The Medical Services Plan (MSP) is BC's health insurance for residents, covering healthcare benefits."
      },
      {
        subtitle: "Who can apply?",
        content: "- BC residents must enrol, under the Medicare Protection Act."
      },
      {
        content: "- Study and work permit holders."
      },
      {
        content: "- Individuals arriving from Ukraine under CUAET."
      },
      {
        content: "- Spouse and children of MSP beneficiaries.",
        link: {
          title: "- Check full eligibility",
          url: "https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment/are-you-eligible"
        }
      },
      {
        subtitle: "When to apply?",
        content: "- As soon as you arrive in BC."
      },
      {
        content: "- Coverage may start about 3 months after arriving in BC (Coverage Wait Period)."
      },
      {
        content: "- During Wait Period, you should get private insurance or former medical plan to cover medical costs."
      },
      {
        subtitle: "What services are covered by MSP?",
        content: "- Medically required services you receive from physicians and midwives and diagnostic services including x-rays.",
        link: {
          title: "- Check details on What's Covered and What's Not",
          url: "https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/benefits"
        }
      },
      {
        subtitle: "How to apply?",
        link: {
          title: "- Apply online, by mail or by phone",
          url: "https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/ahdc"
        }
      },
      {
        link: {
          title: "- Apply in person at a ServiceBC location",
          url: "https://www2.gov.bc.ca/gov/content/governments/organizational-structure/ministries-organizations/ministries/citizens-services/servicebc"
        }
      }
    ]
  }

  const familyDoctor = {
    title: "Finding Canadian Family Doctor",
    contents: [
      {
        subtitle: "What is a Family Doctor?",
        content: "In the Canadian healthcare system, a family doctor (aka a general practitioner, or primary care physician):",
      },
      {
        content: "- Serves as the first point of medical contact;",
      },
      {
        content: "- Provides comprehensive care to patients of all ages;",
      },
      {
        content: "- For basic medical services and general health concerns;",
      },
      {
        content: "- Refers patients to specialists when necessary",
      },
      {
        subtitle: "When to Seek",
        content: "- Family Doctor is the first people you see when having a health concern or question.",
      },
      {
        content: "- If you are experiencing a medical emergency, call 9-1-1 or go to the nearest emergency department.",
      },
      {
        content: "- If you are unsure whether where to seek help, call Healthlink BC at 8-1-1 or 7-1-1 if you are hearing impaired.",
      },
      {
        subtitle: "How to Find",
        link: {
          title: "- Register for BC's Health Connect Registry",
          url: "https://www.healthlinkbc.ca/health-connect-registry",
        }
      },
      {
        link: {
          title: "- Visit the Pathways Medical Care Directory",
          url: "https://pathwaysmedicalcare.ca/"
        },
      },
      {
        content: "- Contact Healthlink BC at 8-1-1 or 7-1-1 if you are hearing impaired."
      },
      {
        link: {
          title: "- Contact local Division of Family Practice.",
          url: "https://divisionsbc.ca/",
        }
      },
      {
        link: {
          title: "- Check third-party websites, such as",
          link: {
            title: "Find a Doctor BC",
            url: "https://www.findadoctorbc.ca/"
          }
        }
      },
      {
        content: "- Ask your family or friends to introduce you to their own family doctor."
      },
      {
        conteng: "- If you are visiting another health care provider, such as a specialist, ask them if they know of any family doctors that are accepting patients."
      },
      {
        conteng: "- If you are visiting a walk-in clinic, ask the doctor if they would be willing to take you on as a patient."
      }
    ],
  };

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
            // navigation.navigate("Details", { detailsContent: msp, category: "medicine", docID: "msp"})
            navigation.navigate("Details", {topic: "msp"})
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
            navigation.navigate("Details", { detailsContent: detailsContent })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/hospital.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>{EntryButtonTextHelper("hospital")}</Text>
        </TouchableOpacity>

        {/* Pharmacy */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { detailsContent: detailsContent })
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/medicine_icon.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>{EntryButtonTextHelper("pharmacy")}</Text>
        </TouchableOpacity>

        {/* Family Doctor */}
        <TouchableOpacity
          onPress={() =>
            // navigation.navigate("Details", { detailsContent: familyDoctor, category: "medicine", docID: "familyDoctor" })
            navigation.navigate("Details", {topic: "familyDoctor"})
          }
          activeOpacity={0.7}
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/family_doctor.png")}
            style={styles.footerImage}
          />
          <Text style={styles.iconText}>{EntryButtonTextHelper("familyDoctor")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default MedicineEntry;
