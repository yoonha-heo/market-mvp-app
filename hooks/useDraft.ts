import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const KEY = "sell-draft";

export type DraftImage =
  | string
  | {
      uri: string;
      mimeType?: string | null;
      fileName?: string | null;
    }
  | null;

export default function useDraft() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<DraftImage>(null);
  const [hydrated, setHydrated] = useState(false);

  const clearDraft = async () => {
    await AsyncStorage.removeItem(KEY);
    setTitle("");
    setPrice("");
    setImage(null);
  };

  useEffect(() => {
    if (!hydrated) return;

    const save = async () => {
      await AsyncStorage.setItem(KEY, JSON.stringify({ title, price, image }));
    };

    save();
  }, [title, price, image]);

  // Restore
  useEffect(() => {
    const load = async () => {
      const data = await AsyncStorage.getItem(KEY);
      if (data) {
        const parsed = JSON.parse(data);
        setTitle(parsed.title || "");
        setPrice(parsed.price || "");
        setImage(parsed.image || null);
      }
      setHydrated(true);
    };

    load();
  }, []);

  return {
    hydrated,
    title,
    setTitle,
    price,
    setPrice,
    image,
    setImage,
    clearDraft,
  };
}
