import { StyleSheet } from "react-native";
import { colors } from "./HelperColors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  welcomeSlogan: {
    fontSize: 18,
  },
  text : {
    fontSize: 20,
  },
  backgroundPic: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
  },
  arrowButton:{
    borderRadius: 20,
    width: 96,
    height: 75,
    flexDirection: "row",
    alighItems: "center",
  },
  arrowButtonText:{
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 5,
  },
  arrowButtonPosition: {
    position: "absolute",
    top: '5%',
    right: '5%',
  },
  dialogBackgroundPic:{
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.themeLight,
    borderRadius: 20,
  },
  dialogButton: {
    borderRadius: 20,
    width: 96,
    height: 75,
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
  dialogTextContainer:{
    marginTop: "7%",
    height: "73%",
    width: "86%",
    borderRadius: 20,
    padding: 5,
    justifyContent: "center",
  },
  dialogButtonText:{
    fontSize: 13,
    fontWeight: "bold",
  },
  essentialButtonPosition: {
    position: "absolute",
    top: '20%',
    left: '35%',
  },
  medicineButtonPosition: {
    position: "absolute",
    bottom: '40%',
    left: '28%',
  },
  transitButtonPosition: {
    position: "absolute",
    bottom: '18%',
    right: '1%',
  },
  profileAvatar:{
    width: 100,
    height: 100,
    // alignSelf: “flex-start”,
    margin: 10,
  },
  profileContainer:{
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
