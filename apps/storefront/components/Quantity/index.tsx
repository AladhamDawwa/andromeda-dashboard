"use client";
import { LuMinus, LuPlus, LuTrash } from "react-icons/lu";

import styles from "./styles.module.scss";
import { NumberFormatter } from "@andromeda/core/utils";
import { useParams } from "next/navigation";

type TButtonGroupProps = {
  count: number;
  updateItemQuantity: (newQuantity: number) => void;
  canDelete?: boolean;
  onDelete?: () => void;
};

const Quantity = ({
  count,
  updateItemQuantity,
  onDelete,
  canDelete = false,
}: TButtonGroupProps) => {
  const min = 1;
  const max = 10;
  const { locale } = useParams();

  const handleIncrease = () => {
    if (count < max) {
      updateItemQuantity(count + 1);
    }
  };

  const handleDecrease = () => {
    if (count > min) {
      updateItemQuantity(count - 1);
    }
  };

  return (
    <div className={`${styles.container} ${count === 1 ? styles.single : ""}`}>
      {canDelete && (
        <button
          onClick={onDelete}
          className={`${styles.button} ${styles.deleteButton}`}
        >
          <LuTrash size={15} strokeWidth={2} />
        </button>
      )}
      <div className={styles.buttonGroup}>
        {count > 1 || !canDelete ? (
          <button
            disabled={count == min && !canDelete}
            onClick={handleDecrease}
            className={styles.button}
          >
            <LuMinus size={15} strokeWidth={4} />
          </button>
        ) : (
          <span style={{ width: "32px" }}></span>
        )}

        <span className={styles.input}>
          {NumberFormatter(count, locale as string)}
        </span>
        <button
          onClick={handleIncrease}
          className={styles.button}
          disabled={count === max}
        >
          <LuPlus size={15} strokeWidth={4} />
        </button>
      </div>
    </div>
  );
};

export default Quantity;
