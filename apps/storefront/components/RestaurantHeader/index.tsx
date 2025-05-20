import Image from "next/image";
import { useParams } from "next/navigation";

import { LanguageSwitcher } from "@/components";
import { NumberFormatter } from "@andromeda/core/utils";

import styles from "./RestaurantHeader.module.scss";
import { useRestaurantAPI } from "@/services";
import { useOrderStore } from "@/store/newStore";
import { useEffect } from "react";

const RestaurantHeader = () => {
  const { getRestaurant } = useRestaurantAPI();
  const { tableNumber, locale } = useParams();
  const { data: restaurant } = getRestaurant();

  const banner = restaurant.banner;
  const image = restaurant.logo;
  const setTaxesAndServices = useOrderStore(
    (state) => state.setTaxandServiceRates
  );
  const setRestaurant = useOrderStore((state) => state.setRestaurant);

  useEffect(() => {
    if (restaurant) {
      setTaxesAndServices(
        Number(restaurant.taxes),
        Number(restaurant.serviceFees)
      );
      setRestaurant(restaurant);
    }
  }, [restaurant, setTaxesAndServices, setRestaurant]);

  return (
    <div className={styles.outerCard}>
      <div
        className={styles.bannerBackground}
        style={{ "--banner-url": `url(${banner})` } as React.CSSProperties}
      ></div>
      <section className={styles.cardContainer}>
        <div className={styles.innerRow}>
          <span className={styles.languageButton}>
            <LanguageSwitcher />
          </span>
          <Image
            src={image || "/restaurantPlaceholder.png"}
            alt="imageTrial"
            width={50}
            height={50}
          ></Image>
          <div className={styles.nameColumn}>
            <h3> {locale === "ar" ? restaurant.nameAr : restaurant.nameEn} </h3>
            <span className={styles.location}>
              {locale === "ar" ? restaurant.locationAr : restaurant.locationEn}
            </span>
          </div>
        </div>
        <div className={styles.badgeContainer}>
          {NumberFormatter(Number(tableNumber), String(locale))}
        </div>
      </section>
    </div>
  );
};

export default RestaurantHeader;
