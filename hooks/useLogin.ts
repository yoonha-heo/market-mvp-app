import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../apis/auth";
import { useAuthStore } from "../store/authStore";

export default function useLogin() {
  const setToken = useAuthStore((s) => s.setToken);

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi(email, password),

    onSuccess: (data) => setToken(data.accessToken, data.refreshToken),
  });
}
