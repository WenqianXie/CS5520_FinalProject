import { StyleSheet, Dimensions } from "react-native";
import { colors } from "./HelperColors";
import { BASE_ICON_SIZE } from "./Constants";
import { imageScale } from "./Constants";

// Get the device's width and height
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const authStyles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: "bold",
    alignSelf: "flex-start", 
    fontSize: 18, 
    marginBottom: 5, 
  },
  input: {
    borderColor: "transparent",
    borderRadius: 20,
    padding: 15,
    fontSize: 16,
    backgroundColor: "white",
    marginBottom: 10,
    width: "100%",
  },
  customButton: {
    backgroundColor: "#FFB703",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themeLight,
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    flex: 1,
    alignItems: "left",
  },
  profilePhotoAndUsername: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 25,
  },
  profileAvatarModalContainer: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  profileAvatarModal: {
    width: "100%",
    height: "45%",
    marginTop: "40%",
    marginBottom: "10%",
  },
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
    margin: 10,
  },
  profileContainer: {
    flex: 1,
    alignItems: "left",
  },
  profilePhotoAndUsername: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 25,
  },
  bottomRow: {
    position: "absolute", // Keeps the component in a fixed position
    flexDirection: "column", // Stacks the children vertically
    justifyContent: "center", // Centers the children vertically within the container
    alignItems: "flex-start", // Aligns children to the start (left side) of the container
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
    width: "95%", // Adjust the width as needed
    height: windowHeight * 0.35,
    borderRadius: 20,
    shaloowColor: "black",
    shadowRadius: 50,
    elevation: 20,
  },
  footerImage: {
    width: BASE_ICON_SIZE * imageScale,
    height: BASE_ICON_SIZE * imageScale,
    resizeMode: "contain",
    marginHorizontal: 5,
  },
  iconContainer: {
    flexDirection: "row", // Aligns the image and text horizontally within each TouchableOpacity
    alignItems: "center", // Centers the items vertically within the TouchableOpacity
    marginLeft: 40,
    marginVertical: 3,
  },
  iconText: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 5,
    marginLeft: 8,
  },
  closeButton: {
    alignSelf: "flex-start",
  },
  reminderButton: {
    alignSelf: "center",
  },
  profileAvatarModalContainer: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  profileAvatarModal: {
    width: "100%",
    height: "45%",
    marginTop: "40%",
    marginBottom: "10%",
  },
});
