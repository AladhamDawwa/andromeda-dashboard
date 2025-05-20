import { useQuery, useMutation } from "@tanstack/react-query";
import { orderAPI } from "@/services/api/order";
import axiosInstance from "@/services/interceptor";
import { TOrderDetails } from "@/types";

export const useOrderAPI = () => {
  const { createOrder, getOrderDetails } = orderAPI(axiosInstance);
  const createOrderMutation = useMutation({ mutationFn: createOrder });

  const useGetOrderDetails = (orderCode: string) =>
    useQuery<TOrderDetails>({
      queryKey: ["order-details", orderCode],
      queryFn: () => getOrderDetails(orderCode),
      staleTime: 1 * 1000,
      enabled: !!orderCode,
    });
  return {
    placeOrder: createOrderMutation.mutateAsync,
    getOrderDetails: useGetOrderDetails,
  };
};
