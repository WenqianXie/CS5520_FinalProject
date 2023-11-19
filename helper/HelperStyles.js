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
  dialogButtonOnPress: {
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
    top: 150,
    left: 150,
  },
  medicineButtonPosition: {
    position: "absolute",
    top: 360,
    left: 120,
  },
  transitButtonPosition: {
    position: "absolute",
    top: 530,
    left: 310,
  },
});
