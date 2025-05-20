import { useTranslation } from "react-i18next";
import { LuChefHat, LuPizza, LuSandwich, LuQrCode } from "react-icons/lu";
import { CollabsableList } from "@/components";

export const Sidebar = () => {
  const { t } = useTranslation();

  const ordersItemList = [
    { label: t("orders"), icon: LuChefHat, pathname: "orders" },
    { label: t("items"), icon: LuPizza, pathname: "items" },
    { label: t("categories"), icon: LuSandwich, pathname: "categories" },
    { label: t("qrCodes"), icon: LuQrCode, pathname: "qr-codes" },
  ];

  return (
    <>
      <CollabsableList title={t("orders")} itemsList={ordersItemList} />
    </>
  );
};

export default Sidebar;
