"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Load token from cookie
  useEffect(() => {
    const match = document.cookie.match(/(^| )token=([^;]+)/);
    if (match) {
      setToken(match[2]);
    }
  }, []);

  const login = (newToken: string) => {
    document.cookie = `token=${newToken}; path=/; max-age=3600; SameSite=Strict; Secure`;
    setToken(newToken);
    router.push("/admin");
  };

  const logout = () => {
    document.cookie = `token=; path=/; max-age=0; SameSite=Strict; Secure`;
    setToken(null);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated: !!token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
