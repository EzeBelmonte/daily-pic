import { useContext } from "react";
import { UserContext } from "../providers/UsersProvider";

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useProfile debe usarse dentro de ProfileProvider"
    );
  }

  return context;
}