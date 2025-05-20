import { useSuspenseQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/interceptor";
import { menuAPI } from "@/services/api/menu";

export const useMenuAPI = () => {
  const { getMenu } = menuAPI(axiosInstance);
  const useGetMenuQuery = (restaurantCode: string) =>
    useSuspenseQuery({
      queryKey: ["menu"],
      queryFn: () => getMenu(restaurantCode),
      refetchOnWindowFocus: false,
      refetchInterval: 0,
      retry: 1,
      staleTime: 1000 * 60 * 10,
    });

  return {
    getMenu: useGetMenuQuery,
  };
};
