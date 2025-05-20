import { useTranslation } from "react-i18next";

import { TOrderCard } from "@/types";

import styles from "./OrderCard.module.scss";
import NumberFormatter from "@andromeda/core/utils/numberFormatter";

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
  return (
    <section
      className={`${styles.orderCard} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <h2 className={styles.title}>
        {t("table")} {NumberFormatter(tableNumber, currentLocale)}
      </h2>
      <div className={styles.details}>
        <span>
          {currentLocale === "en"
            ? ` ${NumberFormatter(orderPlacedTime, currentLocale)} ${t("minsAgo")}`
            : ` ${t("ago")} ${NumberFormatter(orderPlacedTime, currentLocale)} ${t("mins")}`}
        </span>
        <span className={styles.separator}>|</span>
        <span>
          {t("id")} #{orderCode}
        </span>
      </div>
    </section>
  );
};

export default OrderCard;
