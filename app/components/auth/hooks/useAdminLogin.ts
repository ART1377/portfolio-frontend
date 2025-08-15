import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { loginAdmin } from "../actions/authActions";

export function useAdminLogin() {
  const { t } = useTranslation("login");
  const router = useRouter();

  const [username, setUsername] = useState(""); // <-- new
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await loginAdmin(username, password);  // <-- pass username and password
      router.push("/admin");
    } catch (err: any) {
      let errorCode = "UNKNOWN_ERROR";

      try {
        const data = await err.response?.json();
        if (data?.errorCode) errorCode = data.errorCode;
      } catch {
        // ignore JSON parse errors
      }

      setError(t(`errors.${errorCode}`, t("errors.UNKNOWN_ERROR")));
    } finally {
      setIsLoading(false);
    }
  }

  return {
    t,
    username,               // <-- expose username state
    password,
    error,
    showPassword,
    isLoading,
    handleSubmit,
    onUsernameChange: setUsername,  // <-- expose username setter
    onPasswordChange: setPassword,
    toggleShowPassword: () => setShowPassword((v) => !v),
  };
}
