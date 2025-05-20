import { useTranslation } from "react-i18next";

import { QrCodeCard } from "@/components";
import { tables, numberOfTables } from "./qrCodes";

import styles from "./styles.module.scss";
// import QRCode from "react-qr-code";

export type TRestaurantTable = {
  tableNumber: number;
  qrCode: string | null;
};
const QrCodesPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>{t("qrCodesManagement")}</h2>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          padding: "16px",
        }}
      >
        {Array.from({ length: numberOfTables }, (_, i) => {
          const tableNumber = i + 1;
          const table = tables.find(
            (table) => table.tableNumber === tableNumber
          );

          return <QrCodeCard key={tableNumber} table={table!} />;
        })}
      </div>
    </div>
  );
};

export default QrCodesPage;
