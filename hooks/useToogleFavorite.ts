import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFavoriteApi } from "../apis/favorite";
import { useAuthStore } from "../store/authStore";

export const useToggleFavorite = () => {
  const { accessToken } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) =>
      toggleFavoriteApi(accessToken!, productId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
