import { request } from "./client";
import { Product } from "./types";

export const getProductsApi = (token: string) => {
  return request<Product[]>("/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createProductApi = (
  token: string,
  data: { title: string; price: number; imageUrl?: string },
) => {
  return request<Product>("/products", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};
