import { TRestaurant } from "@andromeda/core/types";
import { AxiosInstance } from "axios";

const BaseURL = "api/restaurant/details/fAKCNWs5fq";

export const restaurantAPI = (axios: AxiosInstance) => ({
  getRestaurant: async (): Promise<TRestaurant> => {
    const response = await axios.get<TRestaurant>(`${BaseURL}`);
    return response.data;
  },
});
