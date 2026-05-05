import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { signupApi } from "../apis/auth";
import { useNavigation } from "@react-navigation/native";

export default function useSignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigation = useNavigation();

  const handleChangeEmail = (value: string) => {
    setEmail(value);

    if (!value.includes("@")) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError("");
  };

  const handleChangePassword = (value: string) => {
    setPassword(value);

    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }

    setPasswordError("");
  };

  const {
    mutate: singup,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signupApi(email, password),

    onSuccess: navigation.goBack,
  });

  const submit = () => {
    if (emailError || passwordError) return;
    if (!email || !password) return;

    singup({ email, password });
  };

  return {
    email,
    password,
    emailError,
    passwordError,
    handleChangeEmail,
    handleChangePassword,
    submit,
    isPending,
    signupError: error?.message,
  };
}
