"use client";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { useMenuAPI, useStore } from "@/services";
import { useOrderStore } from "@/store/newStore";
import { RestaurantHeader, Tabs, MenuCategory, ContextBar } from "@/components";
import Button from "@andromeda/core/components/Button";
import { PriceFormatter, NumberFormatter } from "@andromeda/core/utils";
import Loading from "@/app/[locale]/[restaurantCode]/[branchCode]/[tableNumber]/loading";

import styles from "./styles.module.scss";
import { useEffect } from "react";

const Menu = () => {
  const t = useTranslations();
  const { restaurantCode, locale } = useParams();
  const router = useRouter();
  const path = usePathname();

  const { getMenu } = useMenuAPI();
  const { data: menu } = getMenu(restaurantCode as string);

  const totalItems = useStore(useOrderStore, (state) => state.getTotalItems());
  const subtotal = useStore(useOrderStore, (state) => state.getSubtotal());
  const currentOrderId = useOrderStore((state) => state.currentOrderId);
  useEffect(() => {
    if (currentOrderId) {
      //if there is an active order id this means that there is an order
      // that has not yet been completed so we should route to the order status screen instead of showing the checkout page

      router.push(`${path}/order-status`);
    }
  });
  if (totalItems == null || subtotal == null) {
    return <Loading />;
  }
  return (
    <>
      <div className={styles.stickyHeader}>
        <RestaurantHeader />
        <Tabs
          tabs={menu.categories.map((category) => {
            return {
              arName: category.nameAr,
              enName: category.nameEn,
              code: category.code,
            };
          })}
        />
      </div>
      <div className={styles.categoryContainer}>
        {menu.categories.map((category) => (
          <MenuCategory key={category.code} category={category} />
        ))}
      </div>
      <ContextBar className={styles.footer}>
        {totalItems < 1 && (
          <p>Add {PriceFormatter(1, locale as string)} to start your order</p>
        )}
        <Button
          variant="primary"
          disabled={totalItems === 0}
          className={`${styles.basketButton}`}
          onClick={() => {
            router.push(`${path}/place-order`);
          }}
        >
          <div className={`${styles.left}`}>
            <p className={`${styles.basketItems}`}>
              {NumberFormatter(totalItems, locale as string)}
            </p>
            <p>{t("viewBasket")}</p>
          </div>
          <p>{PriceFormatter(subtotal, locale as string)}</p>
        </Button>
      </ContextBar>
    </>
  );
};

export default Menu;
