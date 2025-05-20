import { useSuspenseQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/interceptor";
import { restaurantAPI } from "@/services/api/restaurant";

export const useRestaurantAPI = () => {
  const { getRestaurant } = restaurantAPI(axiosInstance);
  const useGetRestaurantQuery = () =>
    useSuspenseQuery({
      queryKey: ["restaurant"],
      queryFn: () => getRestaurant(),
      refetchOnWindowFocus: false,
      refetchInterval: 0,
      retry: 1,
    });

  return {
    getRestaurant: useGetRestaurantQuery,
  };
};
