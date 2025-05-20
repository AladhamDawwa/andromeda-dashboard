import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, ScrollView } from "react-native";

import { useOrdersAPI } from "@/services";
import { NumberFormatter } from "@andromeda/core/utils";
import { TOrderCard } from "@/types";
import { BottomSheet, Card, OrderCard, OrdersList } from "@/components";
import { SectionList, View, Text } from "react-native";
import { theme } from "@/theme";

export default function OrdersListScreen() {
  const { t, i18n } = useTranslation();
  const { getOrders } = useOrdersAPI();
  const { data: orders, isLoading } = getOrders("GhCEy");

  const [selectedOrderCode, setSelectedOrderCode] = useState<string>("");
  const [visible, setVisible] = useState(false);

  const { pending, accepted, readyToPay } = useMemo(() => {
    const pending: TOrderCard[] = [];
    const accepted: TOrderCard[] = [];
    const readyToPay: TOrderCard[] = [];

    if (orders) {
      orders.forEach((order: TOrderCard) => {
        const status = order.status;
        if (status === "Pending") pending.push(order);
        else if (status === "Accepted") accepted.push(order);
        else if (status === "Ready To Pay") readyToPay.push(order);
      });
    }

    return { pending, accepted, readyToPay };
  }, [orders]);

  if (!orders || isLoading) {
    return null;
  }

  const sections = [
    {
      title: `${t("pending")} (${NumberFormatter(pending.length, i18n.language)})`,
      data: pending,
    },
    {
      title: `${t("accepted")} (${NumberFormatter(accepted.length, i18n.language)})`,
      data: accepted,
    },
    {
      title: `${t("readyToPay")} (${NumberFormatter(readyToPay.length, i18n.language)})`,
      data: readyToPay,
    },
  ];

  return (
    <>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.orderCode}
        contentContainerStyle={{
          padding: theme.spacingMedium,
          backgroundColor: "aliceblue",
        }}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <OrdersList columnHeader={title} />
        )}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10 }}>
            <OrderCard
              order={item}
              onClick={() => {
                setSelectedOrderCode(item.orderCode);
                setVisible(true);
              }}
              isSelected={selectedOrderCode === item.orderCode}
            />
          </Card>
        )}
      />
      <BottomSheet
        visible={visible}
        setVisible={setVisible}
        selectedOrderCode={selectedOrderCode}
      />
    </>
  );
}
