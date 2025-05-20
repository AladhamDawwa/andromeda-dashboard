import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/services/interceptor";
import {
  AddItemPayload,
  EditItemPayload,
  ImageUploadPayload,
  itemsAPI,
} from "@/services/api/items";
import { TItem } from "@andromeda/core/types";

export const useItemsAPI = () => {
  const queryClient = useQueryClient();
  const { getItems, addItem, editItem, deleteItem, uploadItemImage } =
    itemsAPI(axiosInstance);
  const useGetItemsQuery = () =>
    useQuery({
      queryKey: ["items"],
      queryFn: () => getItems(),
      refetchOnWindowFocus: false,
      refetchInterval: 0,
      retry: 1,
    });

  const useAddItemMutation = useMutation({
    mutationFn: (item: AddItemPayload) => addItem(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error: unknown) => {
      console.error("Error adding category:", error);
    },
  });

  const useEditItemMutation = useMutation({
    mutationFn: (item: EditItemPayload) => editItem(item),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error) => {
      console.error("Error editing item:", error);
    },
  });

  const useDeleteItemMutation = useMutation({
    mutationFn: (code: Pick<TItem, "code">) => deleteItem(code),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
  });

  const useUploadItemImageMutation = useMutation({
    mutationFn: (formData: ImageUploadPayload) => uploadItemImage(formData),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["items"] });
      return data;
    },
    onError: (error) => {
      console.error("Error uploading item image:", error);
    },
  });

  return {
    getItems: useGetItemsQuery,
    addItem: useAddItemMutation.mutateAsync,
    editItem: useEditItemMutation.mutateAsync,
    deleteItem: useDeleteItemMutation.mutateAsync,
    uploadItemImage: useUploadItemImageMutation.mutateAsync,
  };
};
