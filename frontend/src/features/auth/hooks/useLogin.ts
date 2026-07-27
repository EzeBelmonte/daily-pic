import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/app/hooks/useAuth";
import { getErrorMessage } from "@/utils/getErrorMessage";

import type { LoginSchema } from "../schemas/auth.schema";
import * as authApi from "@/api/auth.api";

export function useLogin() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [error, setError] = useState<string | null>(null);

  async function loginUser(data: LoginSchema) {
    try {
      setError(null);

      const response = await authApi.login(data);

      login(response.token);

      navigate("/");
    } catch (error) {
      setError(getErrorMessage(error));
    }
  }

  return {
    loginUser,
    error,
  };
}