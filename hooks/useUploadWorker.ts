import { useEffect } from "react";
import { uploadImageApi } from "../apis/uploadImage";
import { useUploadStore } from "../store/uploadStore";

const MAX_RETRY_COUNT = 3;

export default function useUploadWorker() {
  const queue = useUploadStore((s) => s.queue);
  const setQueue = useUploadStore((s) => s.setQueue);

  useEffect(() => {
    if (queue.length === 0) return;
    if (queue.some((item) => item.status === "uploading")) return;

    const item = queue.find((q) => q.status === "pending");
    if (!item) return;

    const run = async () => {
      setQueue((prev) =>
        prev.map((q) =>
          q.id === item.id
            ? { ...q, status: "uploading", errorMessage: undefined }
            : q,
        ),
      );

      try {
        const imageUrl = await uploadImageApi(item.image);

        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id
              ? {
                  ...q,
                  status: "done",
                  imageUrl,
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
  }, [queue, setQueue]);
}
