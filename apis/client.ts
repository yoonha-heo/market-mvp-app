import { useAuthStore } from "../store/authStore";

// const BASE_URL = "https://mvp-server-aslt.onrender.com";
const BASE_URL = "http://localhost:3000";

type RequestOptions = RequestInit & {
  headers?: Record<string, string>;
};

let isRefreshing = false;
let refreshPromise: Promise<{ accessToken: string }> | null = null;

const refreshAccessToken = async () => {
  const { refreshToken, setToken } = useAuthStore.getState();

  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    throw new Error("refresh failed");
  }

  const data = await res.json();

  setToken(data.accessToken, refreshToken!);

  return data.accessToken;
};

export const request = async <T>(
  url: string,
  options: RequestOptions = {},
): Promise<T> => {
  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  // 401 → refresh
  if (res.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = refreshAccessToken().finally(() => {
        isRefreshing = false;
        refreshPromise = null;
      });
    }

    const newAccessToken = await refreshPromise;

    const retryRes = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        "Content-Type": "application/json",
        Authorization: `Bearer ${newAccessToken}`,
      },
    });

    const retryText = await retryRes.text();
    const retryData = JSON.parse(retryText);

    // Check retry errors
    if (!retryRes.ok) {
      throw new Error(retryData.error);
    }

    return retryData;
  }

  // Normal response
  const text = await res.text();
  const data = JSON.parse(text);

  // onError
  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
};
