import { createContext } from "react";

interface IAuthContext {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);
