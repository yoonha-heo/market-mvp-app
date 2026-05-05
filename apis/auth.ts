import { request } from "./client";
import { LoginResponse, SignupResponse } from "./types";

export const loginApi = (email: string, password: string) => {
  return request<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const signupApi = (email: string, password: string) => {
  return request<SignupResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
};
