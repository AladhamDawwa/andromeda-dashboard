import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import NumberFormatter from "@andromeda/core/utils/numberFormatter";
import { theme } from "@/theme";
import { TOrderCard } from "@/types";

type TOrderCardProps = {
  order: TOrderCard;
  onClick?: () => void;
  isSelected: boolean;
};

const OrderCard = ({ order, onClick, isSelected }: TOrderCardProps) => {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language;

  const {
    tableNumber = -1,
    orderPlacedTime = -1,
    orderCode = "",
  } = order || {};

  const timeDisplay =
    currentLocale === "en"
      ? `${NumberFormatter(orderPlacedTime, currentLocale)} ${t("minsAgo")}`
      : `${t("ago")} ${NumberFormatter(orderPlacedTime, currentLocale)} ${t("mins")}`;

  return (
    <Pressable
      onPress={onClick}
      style={({ pressed }) => [
        styles.card,
        isSelected && styles.selectedCard,
        pressed && styles.pressedCard,
      ]}
    >
      <Text style={[styles.title, isSelected && styles.selectedText]}>
        {t("table")} {NumberFormatter(tableNumber, currentLocale)}
      </Text>
      <View style={styles.details}>
        <Text style={[styles.detailText, isSelected && styles.selectedText]}>
          {timeDisplay}
        </Text>
        <Text style={[styles.separator, isSelected && styles.selectedText]}>
          |
        </Text>
        <Text style={[styles.detailText, isSelected && styles.selectedText]}>
          {t("id")} #{orderCode}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    gap: 8, // Note: only supported in RN Web; use marginBottom as fallback if needed
    padding: 8,
    borderWidth: 1,
    borderColor: theme.cardSeparatorColor,
    borderRadius: 8,
    backgroundColor: "white",
    transitionDuration: "300ms", // For RN Web only
  },
  selectedCard: {
    backgroundColor: theme.primaryColor,
  },
  pressedCard: {
    opacity: 0.9,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.cardTitleColor,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 5, // use margins for full compatibility
  },
  detailText: {
    fontSize: 13,
    color: theme.cardDetailsColor,
  },
  separator: {
    color: theme.cardSeparatorColor,
    marginHorizontal: 5,
  },
  selectedText: {
    color: theme.white,
  },
});

export default OrderCard;
