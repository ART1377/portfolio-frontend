"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Eye, EyeOff, Lock, Shield } from "lucide-react";
import { cn } from "@/app/lib/utils/cn/cn";
import { useLang } from "@/app/context/langContext";
import { useAdminLogin } from "../hooks/useAdminLogin";

const LoginForm = () => {
  const {
    t,
    password,
    username,
    error,
    showPassword,
    isLoading,
    handleSubmit,
    onPasswordChange,
    toggleShowPassword,
    onUsernameChange,
  } = useAdminLogin();

  const { dir } = useLang();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br 
    from-[hsl(var(--background)/1)] via-[hsl(var(--secondary)/0.5)] to-[hsl(var(--primary)/0.3)] 
    dark:from-[hsl(var(--background)/0.9)] dark:via-[hsl(var(--secondary)/0.7)] dark:to-[hsl(var(--primary)/0.5)] p-4"
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg mb-4 bg-primary">
            <Shield className="w-8 h-8 text-[hsl(var(--primary-foreground))]" />
          </div>
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: "hsl(var(--foreground))" }}
          >
            {t("adminLogin")}
          </h1>
          <p
            className="text-sm"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            {t("credentialsInfo")}
          </p>
        </div>

        <Card
          className="border-0 shadow-xl bg-[color:var(--card)/0.8] dark:bg-[color:var(--card)/0.8] backdrop-blur-sm"
          style={{ color: "hsl(var(--card-foreground))" }}
        >
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Username Field */}
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium block text-muted-foreground"
                >
                  {t("usernameLabel")}
                </label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => onUsernameChange(e.target.value)}
                  placeholder={t("enterUsername")}
                  autoFocus
                  className={cn(
                    "h-12 bg-[color:var(--muted)/0.5] dark:bg-[color:var(--muted)/0.5] border-[color:var(--border)] dark:border-[color:var(--border)] focus:bg-[color:var(--background)] dark:focus:bg-[color:var(--background)] transition-colors duration-200 placeholder:ps-1",
                    dir === "rtl" ? "pr-10 pl-12" : "pl-12 pr-12",
                    error &&
                      "border-red-300 dark:border-red-500 bg-red-50/50 dark:bg-red-900/20 focus:border-red-400 dark:focus:border-red-400"
                  )}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium block text-muted-foreground">
                  {t("passwordLabel")}
                </label>
                <div className="relative">
                  <div
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2",
                      dir === "rtl" ? "right-3" : "left-3"
                    )}
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    <Lock className="w-5 h-5" />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    placeholder={t("enterPassword")}
                    autoFocus
                    aria-label={t("enterPassword")}
                    className={cn(
                      "h-12 bg-[color:var(--muted)/0.5] dark:bg-[color:var(--muted)/0.5] border-[color:var(--border)] dark:border-[color:var(--border)] focus:bg-[color:var(--background)] dark:focus:bg-[color:var(--background)] transition-colors duration-200 placeholder:ps-1",
                      dir === "rtl" ? "pr-10 pl-12" : "pl-12 pr-12",
                      error &&
                        "border-red-300 dark:border-red-500 bg-red-50/50 dark:bg-red-900/20 focus:border-red-400 dark:focus:border-red-400"
                    )}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    aria-label={
                      showPassword ? t("hidePassword") : t("showPassword")
                    }
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2 hover:text-[color:var(--primary)] focus:outline-none transition-colors duration-200",
                      dir === "rtl" ? "left-3" : "right-3"
                    )}
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <p
                    role="alert"
                    className="text-sm text-red-700 dark:text-red-400 font-medium text-center"
                  >
                    {error}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                 text-primary-foreground !mt-6"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t("loginButton")}...
                  </div>
                ) : (
                  t("loginButton")
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p
          className="text-center text-xs mt-6"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          {t("secureAccessInfo")}
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
