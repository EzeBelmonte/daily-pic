export interface AuthContextType {
  token: string | null;
  isLoading: boolean;

  isAuthenticated: boolean;

  login: (token: string) => void;
  logout: () => void;

}

export interface LoginResponse {
  token: string;
}