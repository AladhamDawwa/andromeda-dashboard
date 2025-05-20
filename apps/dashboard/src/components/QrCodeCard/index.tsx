import { Button, Card } from "@andromeda/core/components";
import styles from "./styles.module.scss";
import QRCode from "react-qr-code";
import { TRestaurantTable } from "@/pages/qr-codes";
import { LuPrinter } from "react-icons/lu";

const QrCodeCard = ({ table }: { table: TRestaurantTable }) => {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const htmlContent = `
      <html>
        <head>
          <title>Print QR Code</title>
          <style>
            body { display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          </style>
        </head>
        <body>
          <div>
            <div style="display: flex; justify-content: center; margin-bottom: 20px;">
              <div>${document.querySelector(`#qr-${table.tableNumber}`)?.innerHTML}</div>
            </div>
            <div style="text-align: center;">Table ${table.tableNumber}</div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Card className={styles.wrapper}>
        {table.qrCode ? (
          <>
            <div className={styles.cardTop} id={`qr-${table.tableNumber}`}>
              <QRCode value={table.qrCode} className={styles.qrCode} />
            </div>
            <div className={styles.cardBottom}>
              <span>Table {table.tableNumber}</span>
              <LuPrinter
                style={{ cursor: "pointer" }}
                size={18}
                onClick={handlePrint}
              />
            </div>
          </>
        ) : (
          <>
            <div className={styles.cardTop}>
              <Button>＋</Button>
            </div>
            <div className={styles.cardBottom}>
              <span>Table {table.tableNumber}</span>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default QrCodeCard;
