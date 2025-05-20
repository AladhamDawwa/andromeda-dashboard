"use client";
import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import { useOrderStore } from "@/store/newStore";

import { NumberFormatter, PriceFormatter } from "@andromeda/core/utils";
import { TItem } from "@andromeda/core/types";
import { ItemSlider } from "@/components";

import clsx from "clsx";
import styles from "./ItemCard.module.scss";

const ItemCard = ({ item }: { item: TItem }) => {
  const { locale } = useParams();
  const [isSelected, setIsSelected] = useState(false);
  const itemQuantity = useOrderStore((state) =>
    state.getItemQuantity(item.code)
  );
  const orderItem = useOrderStore((state) => state.getOrderItem(item.code));
  return (
    <>
      <section
        onClick={() => {
          setIsSelected(true);
        }}
        className={clsx(styles.cardContainer, {
          [styles.selected]: itemQuantity > 0,
        })}
      >
        <div className={styles.cardDetails}>
          <div className={styles.cardInnerDetails}>
            <h3 className={styles.title}>
              {locale === "ar" ? item.nameAr : item.nameEn}
            </h3>
            <span>
              {locale === "ar" ? item.descriptionAr : item.descriptionEn}
            </span>
          </div>

          <span className={styles.price}>
            {PriceFormatter(item.price, locale as string)}
          </span>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src={item.image as unknown as string}
            alt={item.nameEn}
            width={100}
            height={100}
          ></Image>
          {itemQuantity > 0 && (
            <span>{NumberFormatter(itemQuantity, locale as string)}</span>
          )}
        </div>
      </section>
      {isSelected && (
        <ItemSlider
          item={item}
          orderItem={orderItem}
          onClose={() => setIsSelected(false)}
        />
      )}
    </>
  );
};

export default ItemCard;
