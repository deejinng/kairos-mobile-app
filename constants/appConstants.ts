// Color interface
export const colors = {
  primary: "#5B21B6",
  secondary: "#FFF",
  text: "#FFF",
} as const;

export type COLORS = typeof colors;

export const dimensions = {
  smallDeviceWidth: 375,
  tabletWidth: 768,
  scaleTablet: 1.2,
  scaleSmall: 0.9,
} as const;

export type DIMENSIONS = typeof dimensions;