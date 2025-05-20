import { AxiosInstance } from "axios";

const ordersURL = "/api/order";

type TGetOrdersPayload = {
  branchCode: string;
};

type TUpdateOrderStatusPayload = {
  orderCode: string;
  status: string;
};
export const ordersAPI = (axios: AxiosInstance) => ({
  get: async (payload: TGetOrdersPayload) => {
    const response = await axios.post(`${ordersURL}/branch-orders`, payload);
    return response.data;
  },
  updateStatus: async (payload: TUpdateOrderStatusPayload) => {
    const response = await axios.post(`${ordersURL}/update/status`, payload);
    return response.data;
  },
  getOrderDetails: async (orderCode: string) => {
    const response = await axios.get(`${ordersURL}/${orderCode}`);
    return response.data;
  },
});
