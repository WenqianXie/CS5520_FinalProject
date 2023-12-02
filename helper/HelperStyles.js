import { StyleSheet, Dimensions } from "react-native";
import { colors } from "./HelperColors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // welcomeTitle: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  // },
  // welcomeSlogan: {
  //   fontSize: 18,
  // },
  welcomeTitle: {
    fontSize: 38,
    fontWeight: "bold",
    fontStyle: "italic", // Aligns with the artistic tilt of the slogan
    letterSpacing: 1.5, // Subtle spacing to enhance the artistic feel
    textTransform: "uppercase", // Consistency with the slogan style
    color: "#EAE2B7", // A color that stands out yet complements the slogan
    textShadowColor: "rgba(0, 0, 0, 0.5)", // Soft shadow for depth
    textShadowOffset: { width: 2, height: 2 }, // Slightly more pronounced shadow for the title
    textShadowRadius: 3, // A bit more blur to make the title pop
  },

  welcomeSlogan: {
    fontSize: 32,
    fontStyle: "italic",
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#d4a373",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    paddingTop: 10,
  },
  welcomeBackground: {
    flex: 1,
    width: Dimensions.get("window").width, // Full width of the screen
    height: Dimensions.get("window").height, // Full height of the screen
    position: "absolute", // Ensures the gradient covers the entire background
    top: 0,
    left: 0,
  },
  text: {
    fontSize: 20,
  },
  backgroundPic: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
  },
  arrowButton: {
    borderRadius: 20,
    width: 96,
    height: 75,
    flexDirection: "row",
    alighItems: "center",
  },
  arrowButtonText: {
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 5,
  },
  arrowButtonPosition: {
    position: "absolute",
    top: "5%",
    right: "5%",
  },
  dialogBackgroundPic: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.themeLight,
    borderRadius: 20,
  },
  dialogButton: {
    borderRadius: 20,
    width: 100,
    height: 75,
    alignContent: "center",
  },
  textButton: {
    padding: 10,
    margin: 10,
    backgroundColor: colors.themeLight,
    borderRadius: 5,
  },
  textButtonText: {
    color: "black",
    textAlign: "center",
    fontSize: 25,
    marginLeft: 20,
  },
  buttonOnPress: {
    opacity: 0.4,
  },
  dialogTextContainer: {
    marginTop: "7%",
    height: "73%",
    width: "86%",
    paddingLeft: "4%",
    justifyContent: "center",
  },
  dialogButtonText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  essentialButtonPosition: {
    position: "absolute",
    top: "20%",
    left: "35%",
  },
  medicineButtonPosition: {
    position: "absolute",
    bottom: "40%",
    left: "28%",
  },
  transitButtonPosition: {
    position: "absolute",
    bottom: "18%",
    right: "1%",
  },
  profileAvatar: {
    width: 100,
    height: 100,
    // alignSelf: “flex-start”,
    margin: 10,
  },
  profileContainer: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "left",
  },
  profilePhotoAndUsername: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 25,
  },
});
