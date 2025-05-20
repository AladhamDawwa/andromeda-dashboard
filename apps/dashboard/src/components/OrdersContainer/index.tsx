import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useOrdersAPI } from "@/services";

import { Card } from "@andromeda/core/components";
import { OrderCard, OrderDetails, OrdersList } from "@/components";
import { TOrderCard } from "@/types";
import { useParams } from "react-router-dom";
import NumberFormatter from "@andromeda/core/utils/numberFormatter";

import styles from "./OrdersContainer.module.scss";

const OrdersContainer = () => {
  const { t, i18n } = useTranslation();
  const { getOrders } = useOrdersAPI();

  const [selectedOrderCode, setSelectedOrderCode] = useState<string>("");
  const { branchCode } = useParams();
  const { data: ordersDetails } = getOrders(branchCode!);

  const prevDataRef = useRef<typeof ordersDetails | null>(null);
  useEffect(() => {
    if (!prevDataRef.current && ordersDetails) {
      // First load, just store it
      prevDataRef.current = ordersDetails;
      return;
    }
    if (
      prevDataRef.current &&
      ordersDetails &&
      JSON.stringify(prevDataRef.current) !== JSON.stringify(ordersDetails)
    ) {
      if (ordersDetails.length > prevDataRef.current.length) {
        const audio = new Audio("/notification.wav");
        audio.play();
      }
    }
    prevDataRef.current = ordersDetails;
  }, [ordersDetails]);

  const { pending, accepted, readyToPay } = useMemo(() => {
    const pending: TOrderCard[] = [];
    const accepted: TOrderCard[] = [];
    const readyToPay: TOrderCard[] = [];

    if (ordersDetails) {
      ordersDetails.forEach((order: TOrderCard) => {
        const status = order.status;
        if (status === "Pending") pending.push(order);
        else if (status === "Accepted") accepted.push(order);
        else if (status === "Ready To Pay") readyToPay.push(order);
      });
    }

    return { pending, accepted, readyToPay };
  }, [ordersDetails]);
  return (
    <section className={styles.container}>
      <section className={styles.ordersContainer}>
        <Card className={styles.ordersSection}>
          <section className={styles.grid}>
            <OrdersList
              columnHeader={`${t("pending")} (${NumberFormatter(pending.length, i18n.language)})`}
            >
              {pending.length > 0 ? (
                pending.map((order) => (
                  <Card key={order.orderCode}>
                    <OrderCard
                      order={order}
                      onClick={() => setSelectedOrderCode(order.orderCode)}
                      isSelected={selectedOrderCode === order.orderCode}
                    ></OrderCard>
                  </Card>
                ))
              ) : (
                <h4>{t("noOrders")}</h4>
              )}
            </OrdersList>
            <OrdersList
              columnHeader={`${t("accepted")} (${NumberFormatter(accepted.length, i18n.language)})`}
            >
              {accepted.length > 0 ? (
                accepted.map((order) => (
                  <Card key={order.orderCode}>
                    <OrderCard
                      order={order}
                      onClick={() => setSelectedOrderCode(order.orderCode)}
                      isSelected={selectedOrderCode === order.orderCode}
                    ></OrderCard>
                  </Card>
                ))
              ) : (
                <h4>{t("noOrders")}</h4>
              )}
            </OrdersList>
            <OrdersList
              columnHeader={`${t("readyToPay")} (${NumberFormatter(readyToPay.length, i18n.language)})`}
            >
              {readyToPay.length > 0 ? (
                readyToPay.map((order) => (
                  <Card key={order.orderCode}>
                    <OrderCard
                      order={order}
                      onClick={() => setSelectedOrderCode(order.orderCode)}
                      isSelected={selectedOrderCode === order.orderCode}
                    ></OrderCard>
                  </Card>
                ))
              ) : (
                <h4>{t("noOrders")}</h4>
              )}
            </OrdersList>
          </section>
        </Card>
      </section>
      <section className={styles.orderDetailsContainer}>
        <Card className={styles.ordersDetailsSection}>
          <OrderDetails selectedOrderCode={selectedOrderCode} />
        </Card>
      </section>
    </section>
  );
};

export default OrdersContainer;
