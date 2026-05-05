import { request } from "./client";

export const toggleFavoriteApi = (token: string, productId: string) => {
  return request(`/favorite/${productId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
