import { useState } from "react";
import { DraftImage } from "./useDraft";
import { useProductOutboxStore } from "../store/productOutboxStore";

export default function useSell({
  title,
  price,
  image,
}: {
  title: string;
  price: number;
  image: DraftImage;
}) {
  const enqueue = useProductOutboxStore((s) => s.enqueue);
  const [submitError, setSubmitError] = useState<Error | null>(null);

  const submit = async () => {
    if (!title || !Number.isFinite(price) || price <= 0 || !image) {
      throw new Error("title and price required");
    }

    setSubmitError(null);

    try {
      enqueue({
        title,
        price,
        image,
      });

      return true;
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error : new Error("submit failed"),
      );
      return false;
    }
  };

  return {
    submit,
    error: submitError,
  };
}
