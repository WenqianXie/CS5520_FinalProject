// Purpose: Helper function to return the text for the button in the Entry component

const EntryButtonTextHelper = (topic) => {
  switch (topic) {
    // Essentials Entry
    case "driverLicense":
      return "Get Driver License";
    case "sin":
      return "Get Social Insurance Number";
    case "bcServicesCard":
      return "BC Services Card";

    // Medicine Entry
    case "msp":
      return "Apply for Health Insurance";
    case "hospital":
      return "Visit Doctor at Hospital";
    case "pharmacy":
      return "Buy Medicine at Pharmacy";
    case "familyDoctor":
      return "Find Family Doctor";

    // Transit Entry
    case "compassCard":
      return "Get Compass Card";
    case "bus":
      return "Take Bus";
    case "skyTrain":
      return "Take SkyTrain";
    case "seabus":
      return "Take Seabus";
  }
};

export default EntryButtonTextHelper;
