import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ordersAPI } from "@/services/api/orders";
import axiosInstance from "@/services/interceptor";
import { TOrderDetails } from "@/types";

export const useOrdersAPI = () => {
  const queryClient = useQueryClient();

  const { get, getOrderDetails, updateStatus } = ordersAPI(axiosInstance);
  const useGetOrders = (branchCode: string) =>
    useQuery({
      queryKey: ["orders", branchCode],
      queryFn: () => get({ branchCode }),
      refetchInterval: 50000,
      enabled: !!branchCode,
    });
  const useGetOrderDetails = (orderCode: string) =>
    useQuery<TOrderDetails>({
      queryKey: ["order-details", orderCode],
      queryFn: () => getOrderDetails(orderCode),
      enabled: !!orderCode,
    });

  const useUpdateOrderStatusMutation = useMutation({
    mutationFn: (payload: { orderCode: string; status: string }) =>
      updateStatus(payload),

    onSuccess: (variables) => {
      const { orderCode } = variables;
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order-details", orderCode] });
    },
    onError: (error) => {
      console.error("Error updateing order status:", error);
    },
  });

  return {
    getOrders: useGetOrders,
    updateOrderStatus: useUpdateOrderStatusMutation.mutateAsync,
    getOrderDetails: useGetOrderDetails,
  };
};
