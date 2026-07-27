import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { RegisterSchema } from "../schemas/auth.schema";
import * as authApi from "@/api/auth.api";

import { getErrorMessage } from "@/utils/getErrorMessage";

export function useRegister() {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  async function registerUser(data: RegisterSchema) {
    try {
      setError(null);
      await authApi.register(data);

      navigate("/login");
    } catch (error) {
      setError(getErrorMessage(error));
    }
  }

  return {
      registerUser,
      error,
  };
}