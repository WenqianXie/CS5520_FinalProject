// Purpose: Constants for the app

export const DEFAULT_SCREEN_WIDTH = 411.42857142857144;
export const FONTSIZE_CONTROLLER = 0.95;
export const BASE_ICON_SIZE = 50;
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

let imageScaleWidth = 1;
let imageScaleHeight = 1;

if (screenWidth < 360) {
  imageScaleWidth = 0.85; // Smaller screens
} else if (screenWidth > 480) {
  imageScaleWidth = 1.45; // Larger screens
}

if (screenHeight < 640) {
  imageScaleHeight = 0.85; // Smaller screens
} else if (screenHeight > 960) {
  imageScaleHeight = 1.45; // Larger screens
}

const imageScale = Math.min(imageScaleWidth, imageScaleHeight);
export { imageScale };
