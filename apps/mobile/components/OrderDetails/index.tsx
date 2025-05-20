import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useOrdersAPI } from "@/services";
import { toast } from "react-toastify";
import { NumberFormatter, PriceFormatter } from "@andromeda/core/utils";

const OrderDetails = ({ selectedOrderCode }: { selectedOrderCode: string }) => {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language;
  const { getOrderDetails, updateOrderStatus } = useOrdersAPI();
  const { data: orderDetails, isLoading } = getOrderDetails(selectedOrderCode);

  const statusMap = new Map<string, string>([
    ["Pending", "2"],
    ["Accepted", "3"],
    ["Ready To Pay", "4"],
  ]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#d90368" />
      </View>
    );
  }

  if (!orderDetails || orderDetails.status === "Completed") {
    return (
      <View style={styles.centered}>
        <Text>{t("noOrderSelected")}</Text>
      </View>
    );
  }

  const {
    orderCode,
    tableNumber,
    orderPlacedTime,
    items,
    subtotal,
    tip,
    serviceFees: serviceRate,
    taxes: taxRate,
    status,
  } = orderDetails;
  const services = Number(serviceRate) * Number(subtotal);
  const taxes = Number(taxRate) * Number(subtotal);
  const total = Number(subtotal) + services + taxes;
  const handleStatusUpdate = () => {
    const newStatus = statusMap.get(status);
    if (!newStatus) {
      console.error("Invalid status selected");
      return;
    }

    updateOrderStatus({ orderCode, status: newStatus })
      .then(() => {
        toast.success(t("orderStatusUpdatedSuccessfully"));
      })
      .catch((err) => {
        toast.error(t("orderStatusUpdateError"));
        console.error("Error updating order status:", err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {t("order")} #{orderCode}
        </Text>
        <View style={styles.headerDetails}>
          <Text style={styles.tableNumber}>
            {t("table")} {NumberFormatter(tableNumber, currentLocale)}
          </Text>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.timeAgo}>
            {t("placed")}
            {currentLocale === "en"
              ? ` ${NumberFormatter(orderPlacedTime, currentLocale)} ${t("minsAgo")}`
              : ` ${t("ago")} ${NumberFormatter(orderPlacedTime, currentLocale)} ${t("mins")}`}
          </Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.detailsSection}
        >
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>{t("items")}</Text>
            <FlatList
              scrollEnabled={false}
              data={items}
              keyExtractor={(item) => item.menuItemCode}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      {NumberFormatter(item.quantity, currentLocale)} x{" "}
                      {item.menuItemName}
                    </Text>
                    {item.comment && (
                      <Text style={styles.itemComment}> - {item.comment}</Text>
                    )}
                  </Text>
                  <Text>
                    {PriceFormatter(Number(item.price), currentLocale)}
                  </Text>
                </View>
              )}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>{t("summary")}</Text>
            {[
              {
                label: t("subtotal"),
                value: PriceFormatter(Number(subtotal), currentLocale),
              },
              {
                label: `${t("serviceFees")} (${NumberFormatter(15, currentLocale)}%)`,
                value: PriceFormatter(services, currentLocale),
              },
              {
                label: `${t("taxes")} (${NumberFormatter(20, currentLocale)}%)`,
                value: PriceFormatter(taxes, currentLocale),
              },
              {
                label: t("tip"),
                value: PriceFormatter(Number(tip), currentLocale),
              },
            ].map(({ label, value }, i) => (
              <View key={i} style={styles.item}>
                <Text>{label}</Text>
                <Text>{value}</Text>
              </View>
            ))}
            <View style={styles.separatorLine} />
            <View style={styles.item}>
              <Text>{t("total")}</Text>
              <Text>{PriceFormatter(total, currentLocale)}</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleStatusUpdate}>
          <Text style={styles.buttonText}>
            {status === "Pending"
              ? t("acceptOrder")
              : status === "Accepted"
                ? t("finaliseOrder")
                : status === "Ready To Pay"
                  ? t("closeOrder")
                  : ""}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBlock: 28,
    paddingInline: 22,
  },
  header: {
    height: 50,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  tableNumber: {
    backgroundColor: "#d90368",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontWeight: "bold",
    borderRadius: 4,
  },
  separator: {
    color: "#d1d5db",
    marginHorizontal: 5,
  },
  timeAgo: {
    color: "#808080",
  },
  detailsSection: {},
  card: {
    padding: 12,
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    lineHeight: 24,
    marginBottom: 6,
  },
  itemComment: {
    color: "#6a6565",
    fontSize: 13,
  },
  separatorLine: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 8,
  },
  footer: {
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#d90368",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
