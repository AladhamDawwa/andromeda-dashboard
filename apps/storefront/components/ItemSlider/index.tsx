"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useOrderStore } from "@/store/newStore";

import { TItem } from "@andromeda/core/types";
import { ContextBar, Quantity } from "@/components";
import Portal from "@andromeda/core/components/Portal";
import Button from "@andromeda/core/components/Button";
import { PriceFormatter } from "@andromeda/core/utils";

import styles from "./styles.module.scss";
import { TOrderItem } from "@/types";

const ItemSlider = ({
  item,
  orderItem,
  onClose,
}: {
  item: TItem;
  orderItem: TOrderItem | undefined;
  onClose: () => void;
}) => {
  const { locale } = useParams();
  const t = useTranslations();
  const [quantity, setQuantity] = useState(orderItem ? orderItem.quantity : 1);
  const addToCart = useOrderStore((state) => state.addToCart);
  const updateCartItem = useOrderStore((state) => state.updateCartItem);
  const [itemComment, setItemComment] = useState(
    orderItem ? orderItem.comment : ""
  );
  return (
    <Portal>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.slider} onClick={(e) => e.stopPropagation()}>
          <div className={styles.imageWrapper}>
            <Image
              src={
                item.image
                  ? (item.image as unknown as string)
                  : "/itemPlaceholder.jpg"
              }
              alt={`${item.nameEn} Image`}
              fill={true}
            />

            <button className={styles.closeBtn} onClick={onClose}>
              ×
            </button>
          </div>

          <div className={styles.content}>
            <div className={styles.header}>
              <h2 className={styles.title}>
                {locale === "ar" ? item.nameAr : item.nameEn}
              </h2>
              <Quantity count={quantity} updateItemQuantity={setQuantity} />
            </div>

            <div>
              <p className={styles.description}>
                {locale === "ar" ? item.descriptionAr : item.descriptionEn}
              </p>
            </div>
            <div className={styles.notesSection}>
              {item.enableComments && (
                <>
                  <label className={styles.notesLabel}>{t("notes")}</label>
                  <textarea
                    className={styles.notesInput}
                    placeholder={t("notesPlaceholder")}
                    rows={4}
                    value={itemComment}
                    onChange={(e) => setItemComment(e.target.value)}
                  ></textarea>
                </>
              )}
            </div>
          </div>

          <ContextBar>
            <Button
              className={styles.addToOrder}
              onClick={() => {
                if (orderItem) updateCartItem(item.code, quantity, itemComment);
                else addToCart(item, quantity, itemComment);
                onClose();
              }}
            >
              <span>{t(orderItem ? "editOrder" : "addToOrder")}</span>
              <span>
                {PriceFormatter(item.price * quantity, locale as string)}
              </span>
            </Button>
          </ContextBar>
        </div>
      </div>
    </Portal>
  );
};

export default ItemSlider;
