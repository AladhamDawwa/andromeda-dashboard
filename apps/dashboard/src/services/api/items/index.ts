import { AxiosInstance } from "axios";
import { TItem } from "../../../types/item";

const baseURL = "/api/menu";

export type AddItemPayload = Omit<
  TItem,
  "code" | "categoryEn" | "categoryAr" | "image"
>;
export type EditItemPayload = Omit<
  TItem,
  "categoryEn" | "categoryAr" | "image"
>;
export type ImageUploadPayload = Pick<TItem, "code" | "image">;

export const itemsAPI = (axios: AxiosInstance) => ({
  getItems: async () => {
    const response = await axios.get<TItem[]>(`${baseURL}/list`);
    return response.data;
  },
  addItem: async (payload: AddItemPayload) => {
    const response = await axios.post<{
      menuCode: string;
    }>(`${baseURL}/list`, payload);
    return response.data;
  },
  editItem: async (payload: EditItemPayload) => {
    const { code, ...rest } = payload;
    const response = await axios.patch(`${baseURL}/update/${code}`, rest);
    return response.data;
  },
  deleteItem: async (code: Pick<TItem, "code">) => {
    const response = await axios.delete(`${baseURL}/delete/${code}`);
    return response.data;
  },
  uploadItemImage: async (payload: ImageUploadPayload) => {
    const { code, image } = payload;
    const formData = new FormData();
    formData.append("identifier", code);
    formData.append("file", image!);

    const response = await axios.post(`api/files/upload/menu`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
});
