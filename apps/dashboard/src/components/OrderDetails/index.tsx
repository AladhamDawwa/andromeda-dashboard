import { useTranslation } from "react-i18next";

import { Button, Card, Loader } from "@andromeda/core/components";

import styles from "./OrderDetails.module.scss";
import { useOrdersAPI } from "@/services";
import { toast } from "react-toastify";
import PriceFormatter from "@andromeda/core/utils/priceFormatter";
import NumberFormatter from "@andromeda/core/utils/numberFormatter";

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
      <div className={styles.DetailsLoaderContainer}>
        <Loader radius={50} />
      </div>
    );
  }
  if (!orderDetails) {
    return <h2 className={styles.NoneSelected}>{t("noOrderSelected")}</h2>;
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
  if (status === "Completed") {
    return <h2 className={styles.NoneSelected}>{t("noOrderSelected")}</h2>;
  }

  const handleStatusUpdate = (orderCode: string, status: string) => {
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
    <section className={styles.OrderDetailsContainer}>
      <section className={styles.OrderHeaderSection}>
        <h2>
          {t("order")} #{orderCode}
        </h2>
        <p className={styles.OrderHeaderDetails}>
          <span className={styles.TableNumber}>
            {t("table")} {NumberFormatter(tableNumber, currentLocale)}
          </span>
          <span className={styles.Seperator}>|</span>
          <span className={styles.TimeAgo}>
            {t("placed")}
            {currentLocale === "en"
              ? ` ${NumberFormatter(orderPlacedTime, currentLocale)} ${t("minsAgo")}`
              : ` ${t("ago")} ${NumberFormatter(orderPlacedTime, currentLocale)} ${t("mins")}`}
          </span>
        </p>
      </section>
      <section className={styles.OrderDetailsSection}>
        <Card className={styles.OrderDescription}>
          <h3>{t("items")}</h3>
          {items.map((item, index) => (
            <div>
              <div key={index} className={styles.item}>
                <span style={{ display: "flex", gap: "6px" }}>
                  {NumberFormatter(item.quantity, currentLocale)} x
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0px",
                    }}
                  >
                    {item.menuItemName}
                    {item.comment && (
                      <span className={styles.itemComment}>{item.comment}</span>
                    )}
                  </span>
                </span>
                <span>{PriceFormatter(Number(item.price), currentLocale)}</span>
              </div>
            </div>
          ))}
        </Card>
        <Card className={styles.OrderDescription}>
          <h3>{t("summary")}</h3>
          <div className={styles.item}>
            <span>{t("subtotal")}</span>
            <span>{PriceFormatter(Number(subtotal), currentLocale)}</span>
          </div>
          <div className={styles.item}>
            <span>
              {t("serviceFees")} ({NumberFormatter(15, currentLocale)}%)
            </span>
            <span>{PriceFormatter(services, currentLocale)}</span>
          </div>
          <div className={styles.item}>
            <span>
              {t("taxes")} ({NumberFormatter(20, currentLocale)}%)
            </span>
            <span>{PriceFormatter(taxes, currentLocale)}</span>
          </div>
          <div className={styles.item}>
            <span>{t("tip")}</span>
            <span>{PriceFormatter(Number(tip), currentLocale)}</span>
          </div>
          <hr />
          <div className={styles.item}>
            <span>{t("total")} </span>
            <span>{PriceFormatter(total, currentLocale)}</span>
          </div>
        </Card>
      </section>
      <section className={styles.OrderFooterSection}>
        <Button
          style={{
            width: "100%",
          }}
          onClick={() => {
            handleStatusUpdate(orderCode, status);
          }}
        >
          {status === "Pending"
            ? t("acceptOrder")
            : status === "Accepted"
              ? t("finaliseOrder")
              : status === "Ready To Pay"
                ? t("closeOrder")
                : ""}
        </Button>
      </section>
    </section>
  );
};

export default OrderDetails;
