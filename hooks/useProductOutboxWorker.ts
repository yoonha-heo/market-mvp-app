import { useEffect } from "react";
import { uploadImageApi } from "../apis/uploadImage";
import { useProductOutboxStore } from "../store/productOutboxStore";
import { useAuthStore } from "../store/authStore";
import { createProductApi } from "../apis/product";
import { useQueryClient } from "@tanstack/react-query";

const MAX_RETRY_COUNT = 3;

export default function useProductOutboxWorker() {
  const token = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();

  const queue = useProductOutboxStore((s) => s.queue);
  const setQueue = useProductOutboxStore((s) => s.setQueue);

  useEffect(() => {
    if (!token) return;
    if (queue.length === 0) return;
    if (queue.some((item) => item.status === "processing")) return;

    const item = queue.find((q) => q.status === "pending");
    if (!item) return;

    const run = async () => {
      setQueue((prev) =>
        prev.map((q) =>
          q.id === item.id
            ? { ...q, status: "processing", errorMessage: undefined }
            : q,
        ),
      );

      try {
        const imageUrl = await uploadImageApi(item.image);

        const product = await createProductApi(token, {
          title: item.title,
          price: item.price,
          imageUrl,
        });

        await queryClient.invalidateQueries({
          queryKey: ["products"],
        });

        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id
              ? {
                  ...q,
                  status: "done",
                  imageUrl,
                  productId: product.id,
                }
              : q,
          ),
        );
      } catch (e) {
        const error = e instanceof Error ? e : new Error("image upload failed");

        const nextAttempt = item.attempt + 1;

        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id
              ? {
                  ...q,
                  status: nextAttempt >= MAX_RETRY_COUNT ? "error" : "pending",
                  attempt: nextAttempt,
                  errorMessage: error.message,
                }
              : q,
          ),
        );
      }
    };

    run();
  }, [queue, setQueue, token]);
}
