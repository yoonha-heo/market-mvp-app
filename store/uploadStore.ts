import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UploadImageInput } from "../apis/uploadImage";

export type UploadItem = {
  id: string;
  image: UploadImageInput;
  status: "pending" | "uploading" | "error" | "done";
  attempt: number;
  imageUrl?: string;
  errorMessage?: string;
};

type UploadStore = {
  queue: UploadItem[];
  enqueue: (image: UploadImageInput) => void;
  setQueue: (
    updater: UploadItem[] | ((prev: UploadItem[]) => UploadItem[]),
  ) => void;
};

export const useUploadStore = create(
  persist<UploadStore>(
    (set) => ({
      queue: [],

      enqueue: (image) =>
        set((state) => ({
          queue: [
            ...state.queue,
            {
              id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
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
      name: "upload-queue",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
