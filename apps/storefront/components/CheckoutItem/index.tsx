"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

import { useOrderStore } from "@/store/newStore";

import { ItemSlider, Quantity } from "@/components";
import { PriceFormatter } from "@andromeda/core/utils";
import { CiEdit } from "react-icons/ci";

import styles from "./styles.module.scss";
import { TOrderItem } from "@/types";

const CheckoutItem = ({ item }: { item: TOrderItem }) => {
  const { locale } = useParams();
  const [isSelected, setIsSelected] = useState(false);
  const removeFromCart = useOrderStore((state) => state.removeFromCart);
  const updateCartItem = useOrderStore((state) => state.updateCartItem);
  const quantity = item.quantity;

  function updateItemQuantity(newQuantity: number) {
    updateCartItem(item.code, newQuantity, item.comment);
  }
  return (
    <>
      <section className={styles.cardContainer}>
        <div className={styles.cardDetails}>
          <div className={styles.cardInnerDetails}>
            <div>
              <h3 className={styles.title}>
                {locale === "ar" ? item.nameAr : item.nameEn}
              </h3>
              <CiEdit onClick={() => setIsSelected(true)} />
            </div>
            <span className={styles.commentText}>{item.comment}</span>
          </div>
          <div className={styles.cardBottomSection}>
            <span className={styles.priceText}>
              {PriceFormatter(item.price, locale as string)}
            </span>
            <Quantity
              canDelete={true}
              count={quantity}
              updateItemQuantity={updateItemQuantity}
              onDelete={() => {
                removeFromCart(item.code);
              }}
            />
          </div>
        </div>
        <div>
          <Image
            src={item.image as unknown as string}
            alt="imageTrial"
            width={100}
            height={100}
            className={styles.image}
          ></Image>
        </div>
      </section>
      {isSelected && (
        <ItemSlider
          item={item}
          orderItem={item}
          onClose={() => setIsSelected(false)}
        />
      )}
    </>
  );
};

export default CheckoutItem;
