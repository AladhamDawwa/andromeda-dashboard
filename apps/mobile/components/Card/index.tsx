import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { theme } from "@/theme";

type TProps = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
};

const Card = ({ children, style }: TProps) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.white,
    borderRadius: theme.spacingSmall,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    alignSelf: "stretch",
  },
});
