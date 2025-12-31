import { Dimensions, PixelRatio } from "react-native";

// Get device screen width and height
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Reference dimensions — based roughly on iPhone 12
const baseWidth = 390;
const baseHeight = 844;

/**
 * Scales horizontal dimensions like paddings, margins, widths, etc.
 */
export function scaleSize(size: number) {
  return (SCREEN_WIDTH / baseWidth) * size;
}

/**
 * Scales font sizes proportionally.
 */
export function scaleFont(size: number) {
  const newSize = scaleSize(size);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

/**
 * Scales vertical dimensions like heights and top/bottom margins.
 */
export function verticalScale(size: number) {
  return (SCREEN_HEIGHT / baseHeight) * size;
}

/**
 * Hook that exposes all scaling helpers.
 */
export function useResponsive() {
  return { scaleSize, scaleFont, verticalScale };
}

export default useResponsive;