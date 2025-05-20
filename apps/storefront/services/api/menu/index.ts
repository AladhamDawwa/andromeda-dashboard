import { TMenu, TMenuItem } from "@andromeda/core/types";
import { AxiosInstance } from "axios";

const BaseURL = "/api/menu/public/menus";

type GroupedMenu = {
  code: string;
  nameEn: string;
  nameAr: string;
  menuItems: TMenuItem[];
};

export const menuAPI = (axios: AxiosInstance) => ({
  getMenu: async (restaurantCode: string): Promise<TMenu> => {
    try {
      const response = await axios.post<TMenuItem[]>(`${BaseURL}`, {
        restaurantCode,
      });
      const grouped: { [key: string]: GroupedMenu } = {};

      response.data.forEach((item) => {
        if (!grouped[item.categoryCode]) {
          grouped[item.categoryCode] = {
            code: item.categoryCode,
            nameEn: item.categoryEn,
            nameAr: item.categoryAr,
            menuItems: [],
          };
        }
        grouped[item.categoryCode].menuItems.push(item);
      });

      return {
        restaurantCode: "",
        categories: Object.values(grouped),
      };
    } catch (error) {
      console.log(error);
      return {
        restaurantCode: "",
        categories: [],
      };
    }
  },
});
