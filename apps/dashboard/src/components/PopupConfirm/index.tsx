import { Button, Card, Portal } from "@andromeda/core/components";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";

const PopupConfirm = ({
  message,
  onConfirm,
  onCancel,
  isOpen,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <Portal>
      <div className={styles.overlay}>
        <Card className={styles.popup}>
          <p>{message}</p>
          <div className={styles.buttons}>
            <Button onClick={onCancel} className={styles.cancel}>
              {t("cancel")}
            </Button>
            <Button onClick={onConfirm} className={styles.confirm}>
              {t("confirm")}
            </Button>
          </div>
        </Card>
      </div>
    </Portal>
  );
};

export default PopupConfirm;
