"use client";

import { auth } from "@/lib/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      onAuthStateChanged(auth, (user) => {
        setIsAuthenticated(!!user);
        setIsLoading(false);
      });
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true); //
    try {
      await signOut(auth);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
