import { useQuery } from "@tanstack/react-query";
import { getProductsApi } from "../apis/product";
import { useAuthStore } from "../store/authStore";

export const useProducts = () => {
  const { accessToken } = useAuthStore();
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProductsApi(accessToken!),
    placeholderData: (prev) => prev,
  });
};
