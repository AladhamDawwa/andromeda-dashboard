import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/services/interceptor";
import { categoriesAPI } from "@/services/api/categories";
import { TCategory } from "@/types";

export const useCategoriesAPI = () => {
  const queryClient = useQueryClient();

  const { getCategories, addCategory, updateCategory, deleteCategory } =
    categoriesAPI(axiosInstance);
  const useGetCategoriesQuery = () =>
    useQuery({
      queryKey: ["categories"],
      queryFn: () => getCategories(),
      refetchOnWindowFocus: false,
      refetchInterval: 0,
      retry: 1,
    });

  const useAddCategoryMutation = useMutation({
    mutationFn: (category: Pick<TCategory, "nameAr" | "nameEn">) =>
      addCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: unknown) => {
      console.error("Error adding category:", error);
    },
  });

  const useUpdateCategoryMutation = useMutation({
    mutationFn: (category: Pick<TCategory, "code" | "nameAr" | "nameEn">) =>
      updateCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: unknown) => {
      console.error("Error updating category:", error);
    },
  });

  const useDeleteCategoryMutation = useMutation({
    mutationFn: (categoryCode: Pick<TCategory, "code">) =>
      deleteCategory(categoryCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: unknown) => {
      console.error("Error deleting category:", error);
    },
  });

  return {
    getCategories: useGetCategoriesQuery,
    addCategory: useAddCategoryMutation.mutateAsync,
    updateCategory: useUpdateCategoryMutation.mutateAsync,
    deleteCategory: useDeleteCategoryMutation.mutateAsync,
  };
};
