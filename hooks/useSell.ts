import { useState } from "react";
import { DraftImage } from "./useDraft";
import { useProductOutboxStore } from "../store/productOutboxStore";

export default function useSell({
  title,
  price,
  image,
}: {
  title: string;
  price: string;
  image: DraftImage;
}) {
  const enqueue = useProductOutboxStore((s) => s.enqueue);
  const [submitError, setSubmitError] = useState<Error | null>(null);

  const parsedPrice = Number(price);

  const canSubmit = !!title.trim() && parsedPrice > 0 && image;

  const submit = async () => {
    if (!canSubmit) {
      throw new Error("title, price and image required");
    }

    setSubmitError(null);

    try {
      enqueue({
        title,
        price: parsedPrice,
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
    canSubmit,
    error: submitError,
  };
}
