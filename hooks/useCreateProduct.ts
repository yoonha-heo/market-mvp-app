import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { createProductApi } from "../apis/product";
import { useNavigation } from "@react-navigation/native";

type CreateProductParams = {
  title: string;
  price: number;
  imageUrl?: string;
};

export const useCreateProduct = () => {
  const { accessToken } = useAuthStore();
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  return useMutation({
    mutationFn: (data: CreateProductParams) =>
      createProductApi(accessToken!, data),

    onSuccess: () => {
      // refetch products data
      queryClient.invalidateQueries({ queryKey: ["products"] });

      navigation.goBack();
    },
  });
};
