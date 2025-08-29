import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

export function useAdminLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth(); // use context logout

  async function handleLogout() {
    setIsLoading(true);
    try {
      logout(); // AuthProvider handles cookie + redirect
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsLoading(false);
    }
  }

  return { logout: handleLogout, isLoading };
}
