import { useParams, useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { LuArrowBigLeft } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa6";

import { useOrderStore } from "@/store/newStore";

import { useOrderAPI } from "@/services";

import { CheckoutItem, ContextBar } from "@/components";
import { PriceFormatter, NumberFormatter } from "@andromeda/core/utils";
import Button from "@andromeda/core/components/Button";
import styles from "./styles.module.scss";
import Loading from "@/app/[locale]/[restaurantCode]/[branchCode]/[tableNumber]/loading";
import { useEffect } from "react";
import { toast } from "react-toastify";

const calculateTotal = (
  subtotal: number,
  serviceRate: number,
  taxRate: number
) => {
  const serviceFees = subtotal * serviceRate;
  const taxFees = subtotal * taxRate;
  const total = subtotal + serviceFees + taxFees;
  return { serviceFees, taxFees, total };
};

const Checkout = () => {
  const router = useRouter();
  const path = usePathname();

  const { locale, restaurantCode, branchCode, tableNumber } = useParams();
  const t = useTranslations();
  const cart = useOrderStore((state) => state.cart);
  const restaurant = useOrderStore((state) => state.restaurant);
  const setOrderId = useOrderStore((state) => state.setOrderId);
  const currentOrderId = useOrderStore((state) => state.currentOrderId);

  const subtotal = useOrderStore((state) => state.getSubtotal());
  const taxRate = useOrderStore((state) => state.taxRate);
  const serviceRate = useOrderStore((state) => state.serviceRate);

  const { serviceFees, taxFees, total } = calculateTotal(
    subtotal,
    serviceRate,
    taxRate
  );
  const { placeOrder } = useOrderAPI();
  const handlePlaceOrder = async () => {
    const orderItems = cart.map((item) => {
      return {
        menuItemCode: item.code,
        quantity: item.quantity,
        comment: item.comment!,
      };
    });
    const order = {
      restaurantCode: restaurantCode!.toString(),
      branchCode: branchCode!.toString(),
      tableNumber: Number(tableNumber!.toString()),
      tip: 0,
      items: orderItems,
    };

    try {
      const response = await placeOrder(order);

      if (response.status === "Pending") {
        const segments = path.split("/");
        segments[segments.length - 1] = "order-status";
        const newPath = segments.join("/");
        router.push(`${newPath}`);
      }
      setOrderId(response.orderCode);
    } catch (error) {
      console.log("errror ", error);
      toast.error("An error occured when placing the order");
      // alert("");
    }
  };

  useEffect(() => {
    if (currentOrderId) {
      //if there is an active order id this means that there is an order
      // that has not yet been completed so we should route to the order status screen instead of showing the checkout page
      const segments = path.split("/");
      segments[segments.length - 1] = "order-status";
      const newPath = segments.join("/");
      router.push(`${newPath}`);
    }
  });
  if (cart.length === 0) {
    return (
      <div className={styles.emptyOrderWrapper}>
        <Image
          width={120}
          height={120}
          src="/empty-order.png"
          alt="empty order"
        />
        <h4>{t("emptyOrder")}</h4>
        <Button variant="outline" onClick={() => router.push("./")}>
          <LuArrowBigLeft size={18} />
          {t("continueShopping")}
        </Button>
      </div>
    );
  }
  if (restaurant == null) {
    return <Loading></Loading>;
  }
  return (
    <div className={styles.wrapper}>
      <ContextBar className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.iconWrapper} onClick={() => history.back()}>
            <FaArrowLeft className={styles.backArrow} />
          </div>
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
      <section className={styles.checkoutDetails}>
        {cart.map((item, index) => (
          //the item code is used as the key instead of index because index causes problems when working with the state.
          <div key={item.code}>
            <CheckoutItem item={item} />
            {index < cart.length - 1 && <hr className={styles.divider} />}
          </div>
        ))}
        <div className={styles.billSummary}>
          <h3 className={styles.summaryHeader}>{t("billSummary")}</h3>

          <div className={styles.row}>
            <span>{t("subtotal")}</span>
            <span>{PriceFormatter(subtotal, locale as string)}</span>
          </div>

          <div className={styles.row}>
            <span>
              {t("serviceFees")} ({" "}
              {NumberFormatter(Math.round(serviceRate * 100), locale as string)}
              %)
            </span>
            <span>{PriceFormatter(serviceFees, locale as string)}</span>
          </div>

          <div className={styles.row}>
            <span>
              {t("taxes")}({" "}
              {NumberFormatter(Math.round(taxRate * 100), locale as string)}%)
            </span>
            <span>{PriceFormatter(taxFees, locale as string)}</span>
          </div>

          <div className={`${styles.row} ${styles.total}`}>
            <span>{t("total")}</span>
            <span>{PriceFormatter(total, locale as string)}</span>
          </div>
        </div>
      </section>

      <ContextBar className={styles.checkoutFooter}>
        <Button onClick={handlePlaceOrder}>{t("orderNow")}</Button>
        <div className={styles.textWrapper}>
          <span className={styles.title}>
            {PriceFormatter(total, locale as string)}
          </span>
          <span className={styles.subtitle}>
            {NumberFormatter(cart.length, locale as string)} {t("selections")}
          </span>
        </div>
      </ContextBar>
    </div>
  );
};

export default Checkout;
