// const BASE_URL = "https://mvp-server-aslt.onrender.com";
const BASE_URL = "http://localhost:3000";

export type UploadImageInput =
  | string
  | {
      uri: string;
      mimeType?: string | null;
      fileName?: string | null;
    };

export const uploadImageApi = async (image: UploadImageInput) => {
  const uri = typeof image === "string" ? image : image.uri;
  const type =
    typeof image === "string" ? "image/jpeg" : (image.mimeType ?? "image/jpeg");
  const name =
    typeof image === "string" ? "photo.jpg" : (image.fileName ?? "photo.jpg");
  const formData = new FormData();

  formData.append("image", {
    uri,
    type,
    name,
  } as any);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("upload failed");
  }

  const data = await res.json();

  return data.imageUrl as string;
};
