import { useMutation, useQuery } from "@tanstack/react-query";
import { authAPI } from "@/services/api/auth";
import axiosInstance from "@/services/interceptor";

export const useAuthAPI = () => {
  const { login, getUser } = authAPI(axiosInstance);
  const loginMutation = useMutation({ mutationFn: login });
  const useGetUserData = (isEnabled: boolean) =>
    useQuery({
      queryKey: ["user-data", isEnabled],
      queryFn: () => getUser(),
      enabled: !!isEnabled,
      refetchInterval: 0,
      refetchOnWindowFocus: false,
      retry: 1,
    });
  return {
    login: loginMutation.mutateAsync,
    getUser: useGetUserData,
  };
};
