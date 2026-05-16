import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFavoriteApi } from "../apis/favorite";
import { useAuthStore } from "../store/authStore";
import { Product } from "../apis/types";

export const useToggleFavorite = () => {
  const { accessToken } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) =>
      toggleFavoriteApi(accessToken!, productId),

    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({
        queryKey: ["products"],
      });

      const previousProducts = queryClient.getQueryData<Product[]>([
        "products",
      ]);

      queryClient.setQueryData<Product[]>(["products"], (old) => {
        if (!old) return old;

        return old.map((product) =>
          product.id === productId
            ? {
                ...product,
                isFavorite: !product.isFavorite,
              }
            : product,
        );
      });

      return {
        previousProducts,
      };
    },

    onError: (_error, _productId, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(["products"], context.previousProducts);
      }
    },
  });
};
