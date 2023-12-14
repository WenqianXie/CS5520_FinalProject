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

  const msp = {
    title: "Applying for Health Insurance",
    contents: [
      {
        subtitle: "What is MSP?",
        content:
          "The Medical Services Plan (MSP) is BC's health insurance for residents, covering healthcare benefits.",
      },
      {
        subtitle: "Who can apply?",
        content:
          "BC residents must enrol, under the Medicare Protection Act. \n" +
          "Study and work permit holders.\n" +
          "Individuals arriving from Ukraine under CUAET.\n" +
          "Spouse and children of MSP beneficiaries.\n",
        link: {
          title: "Check full eligibility",
          url: "https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment/are-you-eligible",
        },
      },
      {
        subtitle: "When to apply?",
        content:
          "As soon as you arrive in BC! Coverage may start about 3 months after arriving in BC (Coverage Wait Period)." +
          "During the wait period, you are responsible for paying for your own medical care. ",
      },
      {
        subtitle: "What services are covered by MSP?",
        content:
          "Medically required services you receive from physicians and midwives and diagnostic services including x-rays.",
        link: {
          title: "- Check details on What's Covered and What's Not",
          url: "https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/benefits",
        },
      },
      {
        subtitle: "How to apply?",
        link: [
          {
            title: "Apply online, by mail or by phone",
            url: "https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/ahdc",
          },
          {
            title: "- Apply in person at a ServiceBC location",
            url: "https://www2.gov.bc.ca/gov/content/governments/organizational-structure/ministries-organizations/ministries/citizens-services/servicebc",
          },
        ],
      },
    ],
  };

  const familyDoctor = {
    title: "Finding Canadian Family Doctor",
    contents: [
      {
        subtitle: "What is a Family Doctor?",
        content:
          "In the Canadian healthcare system, a family doctor (aka a general practitioner, or primary care physician):\n" +
          "- Serves as the first point of medical contact;" +
          "- Provides comprehensive care to patients of all ages;" +
          "- For basic medical services and general health concerns;" +
          "- Refers patients to specialists when necessary",
      },
      {
        subtitle: "When to Seek",
        content:
          "Family Doctor is the first people you see when having a health concern or question.\n" +
          "If you are experiencing a medical emergency, call 9-1-1 or go to the nearest emergency department." +
          "If you are unsure whether where to seek help, call Healthlink BC at 8-1-1 or 7-1-1 if you are hearing impaired.",
      },
      {
        subtitle: "How to Find",
        link: [
          {
            title: "Register for BC's Health Connect Registry",
            url: "https://www.healthlinkbc.ca/health-connect-registry",
          },
          {
            title: "- Visit the Pathways Medical Care Directory",
            url: "https://pathwaysmedicalcare.ca/",
          },
          {
            title: "- Contact local Division of Family Practice.",
            url: "https://divisionsbc.ca/",
          },
          {
            title: "- Check third-party websites, such as",
            link: {
              title: "Find a Doctor BC",
              url: "https://www.findadoctorbc.ca/",
            },
          },
        ],
        content:
          "Ask your family or friends to introduce you to their own family doctor.\n" +
          "If you are visiting another health care provider, such as a specialist, ask them if they know of any family doctors that are accepting patients.\n" +
          "If you are visiting a walk-in clinic, ask the doctor if they would be willing to take you on as a patient.\n",
      },
    ],
  };

  const pharmacy = {
    title: "Buying Medicine at Pharmacy",
    contents: [
      {
        subtitle: "Non-Prescription Medicine",
        content:
          "Non-prescription medicine (Over-the-counter drugs) can be purchased at any pharmacy or drug store." +
          "Some common OTCs are pain relif, flu and cold remedies, nutritional supplements." +
          "You can simply go to a pharmacy and ask for the medicine you need.",
      },
      {
        subtitle: "Prescription Medicine",
        content:
          "Prescription Medicines are drugs that are only meant for use by the individual to whom they are prescribed. To access these drugs, first you need a prescription from a doctor which you can bring to a pharmacy in Canada to have filled.\n" +
          "To get a prescription from a Canadian doctor, you can: ",
        link: [
          {
            title: " - Visit Shoppers Drug Mart",
            url: "https://www.shoppersdrugmart.ca/en/health-and-wellness/pharmacy-services?province=BC",
          },
          {
            title: " - Visit Rexall",
            url: "https://www.rexall.ca/pharmacy-services/medication-management",
          },
          {
            title: " - Visit London Drugs",
            url: "https://pharmacy.londondrugs.com/pharmacy-services",
          },
        ],
        content: "Visit a walk-in clinic or a family doctor.",
      },
    ],
  };

  const hospital = {
    title: "Visiting Doctor at Hospital",
    contents: [
      {
        subtitle: "Visit a walk-in clinic",
        list: [
          {
            content:
              "Walk-in clinics are for non-emergency care. They are designed to provide quicker care for non-life-threatening conditions when going to a family doctor is not an option. ",
            link: {
              title: "Find a walk-in clinic near you",
              url: "https://www.healthlinkbc.ca/services-and-resources/find-services",
            },
          },
        ],
        content: "For non-emergency issue, call 811 for 24/7 health advice.",
      },
      {
        subtitle: "Visit an urgent care clinic ",
        content:
          "If you are having: \n" +
          " - Difficulty breathing \n" +
          " - Severe abdominal pain \n" +
          " - Severe bleeding or head injury \n" +
          "Call 911!",
        link: {
          title: "Or find an urgent care clinic near you",
          url: "https://www.healthlinkbc.ca/health-services/search-services-your-area?fromgs&findquery=Emergency%20Room",
        },
      },
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
          onPress={() => navigation.navigate("Details", { topic: "msp" })}
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
          onPress={() => navigation.navigate("Details", { topic: "hospital" })}
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
          onPress={() => navigation.navigate("Details", { topic: "pharmacy" })}
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
