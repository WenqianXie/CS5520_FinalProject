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
  profileAvatar: {
    width: 150,
    height: 150,
  },
  profileAvatarModalContainer: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  profileAvatarModal: {
    width: "100%",
    height: "45%",
  },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
  },
  profilePhotoAndUsername: {
    alignItems: "center",
    flexDirection: "column",
    marginTop: -200,
    borderRadius: 50,
    marginBottom: 50,
  },
  fullWidthButton: {
    paddingHorizontal: 0,
    paddingVertical: 20,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  buttonText: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    paddingHorizontal: 10,
  },
  welcomeBackground: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export const exploreStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    backgroundColor: colors.transparentWhite,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: "#FFEEC2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 6,
    maxWidth: "50%",
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    color: "#023047",
    fontStyle: "italic",
  },
  arrowButtonPosition: {
    position: "absolute",
    top: "5%",
    right: "5%",
  },
  backgroundPic: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
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
});

export const questionnaireStyles = StyleSheet.create({
  questionContainer: {
    marginVertical: 8,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  question: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 15,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingLeft: 10,
  },
  option: {
    fontSize: 16,
    color: "#555555",
  },
  reminderContainer: {
    backgroundColor: "#D48788",
    padding: 10,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  reminderText: {
    fontSize: 18,
    color: "#0D1B2A",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export const bulletPointContentStyles = StyleSheet.create({
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },
  contentContainer: {
    justifyContent: "flex-start",
    marginVertical: 5,
  },
  detailsContent: {
    fontSize: 16,
    letterSpacing: 0.5,
    lineHeight: 24,
    color: "#333",
  },
  image: {
    width: "100%",
    height: 200,
    marginVertical: 10,
    borderRadius: 8,
  },
  webview: {
    height: 400,
    marginVertical: 10,
  },
  map: {
    marginVertical: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  sectionContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, 
  },
  bullet: {
    fontSize: 18,
    marginRight: 8,
    color: "#333",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },
  detailsContent: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10, 
  },
  webview: {
    height: 400,
    borderRadius: 10, 
    overflow: "hidden", 
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
    fontStyle: "italic",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#EAE2B7",
    textShadowColor: colors.transparentWhite,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },

  welcomeSlogan: {
    fontSize: 32,
    fontStyle: "italic",
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#d4a373",
    textShadowColor: colors.transparentWhite,
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
    position: "absolute",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    width: "95%",
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
    flexDirection: "row",
    alignItems: "center",
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
