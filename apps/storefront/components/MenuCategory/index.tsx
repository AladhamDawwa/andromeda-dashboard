import { TMenuItem } from "@andromeda/core/types/menu-item";
import { TCategory } from "@andromeda/core/types/menu-category";
import styles from "./styles.module.scss";
import ItemCard from "../ItemCard";
import { useParams } from "next/navigation";

const MenuCategory = ({
  category,
}: {
  category: Omit<TCategory, "menuItems" | "restaurantCode"> & {
    menuItems: TMenuItem[];
  };
}) => {
  const { locale } = useParams();

  return (
    <div id={category.code} className={styles.categorySection}>
      <p>{locale == "ar" ? category.nameAr : category.nameEn}</p>
      <div>
        {category.menuItems.map((item) => (
          <ItemCard key={item.code} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
