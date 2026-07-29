import axios from "axios";

export function getErrorMessage(
  error: unknown
): string | null {
  if (!error) {
    return null;
  }
  
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ??
      "Ocurrió un error inesperado"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Ocurrió un error inesperado";
}