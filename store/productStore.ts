import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Product = {
  id: string;
  title: string;
  price: number;
};

type ProductStore = {
  products: Product[];
  addProduct: (product: Product) => void;
};

export const useProductStore = create(
  persist<ProductStore>(
    (set) => ({
      products: [],
      addProduct: (product: Product) =>
        set((state) => ({ products: [...state.products, product] })),
    }),
    { name: "product", storage: createJSONStorage(() => AsyncStorage) },
  ),
);
