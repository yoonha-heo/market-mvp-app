import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UploadImageInput } from "../apis/uploadImage";

export type ProductOutboxItem = {
  id: string;

  title: string;
  price: number;
  image: UploadImageInput;

  status: "pending" | "processing" | "error" | "done";
  attempt: number;

  imageUrl?: string;
  productId?: string;
  errorMessage?: string;
};

type UploadStore = {
  queue: ProductOutboxItem[];

  enqueue: (input: {
    title: string;
    price: number;
    image: UploadImageInput;
  }) => void;

  setQueue: (
    updater:
      | ProductOutboxItem[]
      | ((prev: ProductOutboxItem[]) => ProductOutboxItem[]),
  ) => void;
};

export const useProductOutboxStore = create(
  persist<UploadStore>(
    (set) => ({
      queue: [],

      enqueue: ({ title, price, image }) =>
        set((state) => ({
          queue: [
            ...state.queue,
            {
              id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              title,
              price,
              image,
              status: "pending",
              attempt: 0,
            },
          ],
        })),

      setQueue: (updater) =>
        set((state) => ({
          queue: typeof updater === "function" ? updater(state.queue) : updater,
        })),
    }),
    {
      name: "product-outbox",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
