"use client";
import StatusTracking from "@/components/StatusTracker";
import styles from "./styles.module.scss";
import { ContextBar } from "@/components";
import { useParams, usePathname } from "next/navigation";
import { useOrderStore } from "@/store/newStore";
import { calculateTotal } from "./../../services/helperFunctions";
import Loading from "@/app/[locale]/[restaurantCode]/[branchCode]/[tableNumber]/loading";
import { useTranslations } from "next-intl";
import { NumberFormatter, PriceFormatter } from "@andromeda/core/utils";
import { useOrderAPI } from "@/services";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const OrderStatus = () => {
  const t = useTranslations();
  const { getOrderDetails } = useOrderAPI();
  const router = useRouter();
  const path = usePathname();

  const { locale } = useParams();
  const restaurant = useOrderStore((state) => state.restaurant);

  const orderCode = useOrderStore((state) => state.currentOrderId);

  // const currentOrderId = useOrderStore((state) => state.currentOrderId);

  const clearCart = useOrderStore((state) => state.clearCart);
  const setOrderId = useOrderStore((state) => state.setOrderId);

  const { data: orderDetails } = getOrderDetails(orderCode!);
  const statusMap = new Map<string, string>([
    ["Pending", "0"],
    ["Accepted", "1"],
    ["Ready To Pay", "2"],
  ]);
  console.log("calllllllled");
  useEffect(() => {
    //the condition checks if there is an active order and checks if the current order is completed.
    //the two condition have to be seperated because when routing to this page with
    // if (restaurant) {
    if (!orderCode) {
      clearCart();
      setOrderId(null);
      const newPath = path.split("/").slice(0, -1).join("/");
      console.log(`new path: ${newPath}`);
      router.push(newPath);
    } else {
      if (orderDetails) {
        if (orderDetails.status === "Completed") {
          clearCart();
          setOrderId(null);
          const newPath = path.split("/").slice(0, -1).join("/");
          console.log(`new path: ${newPath}`);
          router.push(newPath);
        }
      }
    }
    // }
  });

  if (restaurant == null || orderDetails == null) {
    return <Loading></Loading>;
  }

  const orderStatus = statusMap.get(orderDetails.status)!;
  const { serviceFees, taxFees, total } = calculateTotal(
    Number(orderDetails.subtotal),
    Number(orderDetails.taxes),
    Number(orderDetails.serviceFees)
  );

  return (
    <div className={styles.columnWrapper}>
      <ContextBar className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.textWrapper}>
            <span className={styles.title}>
              {locale === "ar" ? restaurant.nameAr : restaurant.nameEn}
            </span>
            <span className={styles.subtitle}>
              {locale === "ar" ? restaurant.locationAr : restaurant.locationEn}
            </span>
          </div>
        </div>
      </ContextBar>
      <StatusTracking currentStep={Number(orderStatus)} />
      <section className={styles.orderDetailsSection}>
        <div className={styles.orderSummary}>
          <h3 className={styles.summaryHeader}>{t("orderSummary")}</h3>
          {orderDetails.items.map((item) => (
            <div key={item.menuItemCode}>
              <div className={styles.orderDetailsRow}>
                <div className={styles.orderInnerRow}>
                  <span>{item.quantity}</span>
                  <span>x</span>
                  <span>
                    {locale === "ar" ? item.menuItemName : item.menuItemName}
                  </span>
                </div>
                <span>
                  {PriceFormatter(
                    Number(item.price) * item.quantity,
                    locale as string
                  )}
                </span>
              </div>
            </div>
          ))}

          <h3 className={styles.billSummaryHeader}>{t("billSummary")}</h3>
          <div className={styles.billSummaryRow}>
            <span>{t("subtotal")}</span>
            <span>
              {PriceFormatter(Number(orderDetails.subtotal), locale as string)}
            </span>
          </div>

          <div className={styles.billSummaryRow}>
            <span>
              {t("serviceFees")} ({" "}
              {NumberFormatter(
                Math.round(Number(orderDetails.serviceFees) * 100),
                locale as string
              )}
              %)
            </span>
            <span>{PriceFormatter(serviceFees, locale as string)}</span>
          </div>

          <div className={styles.billSummaryRow}>
            <span>
              {t("taxes")}({" "}
              {NumberFormatter(
                Math.round(Number(orderDetails.taxes) * 100),
                locale as string
              )}
              %)
            </span>
            <span>{PriceFormatter(taxFees, locale as string)}</span>
          </div>

          <div className={`${styles.billSummaryRow} ${styles.total}`}>
            <span>{t("total")}</span>
            <span>{PriceFormatter(total, locale as string)}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderStatus;
