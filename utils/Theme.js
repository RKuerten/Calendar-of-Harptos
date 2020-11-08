import { PixelRatio, Platform, Dimensions } from "react-native";
import Constants from "expo-constants";

const { width, height } = Dimensions.get("window");
const realWidth = height > width ? width : height;
const realHeight = height > width ? height : width;

const APPBAR_HEIGHT = Platform.OS === "ios" ? Constants.statusBarHeight : 56;

const relativeWidth = (num) => (realWidth * num) / 100;
const relativeHeight = (num) => (realHeight * num) / 100;

const isTablet = () => {
  let pixelDensity = PixelRatio.get();
  let adjustedWidth = width * pixelDensity;
  let adjustedHeight = height * pixelDensity;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  } else {
    return (
      pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
    );
  }
};

const responsiveFontSize = (fontSize) => {
  let divider = isTablet() ? 600 : 375;
  return Math.round((fontSize * realWidth) / divider);
};

const responsiveHeight = (height) => {
  if (!isTablet()) return height;
  else return height + height * 0.25;
};

export default {
  APPBAR_HEIGHT,
  relativeHeight,
  relativeWidth,
  responsiveFontSize,
  responsiveHeight,
};
