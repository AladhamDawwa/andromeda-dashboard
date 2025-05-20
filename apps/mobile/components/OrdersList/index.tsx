import React from "react";
import { Text, StyleSheet } from "react-native";
import { theme } from "@/theme";

type OrdersListProps = {
  columnHeader: string;
};

const OrdersList = ({ columnHeader }: OrdersListProps) => {
  return (
    <>
      <Text style={styles.header}>{columnHeader}</Text>
    </>
  );
};

export default OrdersList;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.cardTitleColor,
    paddingVertical: theme.spacingMedium,
    textAlign: "left",
  },
  // ordersListContent: {
  //   paddingVertical: theme.spacingLarge,
  //   paddingHorizontal: theme.spacingMedium,
  // },
});
