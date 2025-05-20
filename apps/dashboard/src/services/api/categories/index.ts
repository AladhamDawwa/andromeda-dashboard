import { AxiosInstance } from "axios";
import { TCategory } from "../../../types/category";

const BaseURL = "/api/menu/categories";

export const categoriesAPI = (axios: AxiosInstance) => ({
  getCategories: async () => {
    const response = await axios.get<TCategory[]>(`${BaseURL}`);
    return response.data;
  },
  addCategory: async (category: Pick<TCategory, "nameAr" | "nameEn">) => {
    const response = await axios.post<Pick<TCategory, "nameAr" | "nameEn">>(
      `${BaseURL}/create`,
      category
    );
    return response.data;
  },
  updateCategory: async (
    category: Pick<TCategory, "code" | "nameAr" | "nameEn">
  ) => {
    const response = await axios.put<TCategory>(
      `${BaseURL}/update/${category.code}`,
      {
        nameAr: category.nameAr,
        nameEn: category.nameEn,
      }
    );
    return response.data;
  },
  deleteCategory: async (categoryCode: Pick<TCategory, "code">) => {
    const response = await axios.delete<TCategory>(
      `${BaseURL}/delete/${categoryCode}`
    );
    return response.data;
  },
});
