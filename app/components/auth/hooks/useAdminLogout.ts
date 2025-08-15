import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutAdmin } from "../actions/authActions";

export function useAdminLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function logout() {
    setIsLoading(true);
    try {
      await logoutAdmin();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsLoading(false);
      router.push("/auth/login");
    }
  }

  return { logout, isLoading };
}
