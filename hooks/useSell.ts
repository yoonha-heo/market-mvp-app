import { useState } from "react";
import { uploadImageApi } from "../apis/uploadImage";
import { useCreateProduct } from "./useCreateProduct";
import { DraftImage } from "./useDraft";

export default function useSell({
  title,
  price,
  image,
}: {
  title: string;
  price: string;
  image?: DraftImage;
}) {
  const createProductMutation = useCreateProduct();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<Error | null>(null);

  const submit = async () => {
    if (isSubmitting || createProductMutation.isPending) return false;
    if (!title || !price) return false;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let imageUrl: string | undefined;

      if (image) {
        imageUrl = await uploadImageApi(image);
      }

      await createProductMutation.mutateAsync({
        title,
        price: Number(price),
        imageUrl,
      });

      return true;
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error : new Error("submit failed"),
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submit,
    loading: isSubmitting || createProductMutation.isPending,
    error: submitError ?? createProductMutation.error,
  };
}
