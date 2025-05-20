import { TMenuItem } from "./menu-item";

export type TMenu = {
  restaurantCode: string;
  categories: {
    code: string;
    nameEn: string;
    nameAr: string;
    menuItems: TMenuItem[];
  }[];
};
