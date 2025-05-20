// theme.ts

export const theme = {
  // Colors
  primaryColor: "#d90368",
  surfaceLight: "#f2f2f2",
  primaryColorFaded: "#d90368",
  cardTitleColor: "#202d48",
  cardDetailsColor: "#718ebf",
  cardSeparatorColor: "#d1d5db",
  white: "#ffffff",
  gray: "#808080",
  orderDetailsText: "#6a6565",
  black: "#000000",

  // Derived Colors (manually calculated from color-mix)
  colorPrimaryDark: "#ae0351", // Approximation of 80% #d90368 + 20% black
  colorPrimaryLight: "#e30b70", // Approximation of 90% #d90368 + 10% white
  colorPrimaryHover: "#fce5ec", // Approximation of 15% #d90368 + 85% white
  colorPrimaryTransparent: "rgba(217, 3, 104, 0.1)",

  // Neutral Colors
  colorSecondary: "#333333",
  colorSecondaryDark: "#2e2e2e",
  colorLight: "#f5f5f5",
  colorDark: "#222222",
  borderColor: "#eeeeee",

  // UI Effects
  hoverColor: "#fce5ec",
  shadowColor: "rgba(217, 3, 104, 0.2)",

  // Spacing
  spacingSmall: 8,
  spacingMedium: 14,
  spacingLarge: 18,
  spacing5: 16,
  spacing6: 24,

  // Border Radius
  borderRadius: 8,

  // Breakpoints (you’ll need to use Dimensions API in RN for this)
  breakpointMobile: 768,

  // Fonts (used as fontFamily in Text styles, assuming fonts are linked)
  fontPrimary: "Montserrat",
  fontPrimaryAr: "Tajawal",
};
