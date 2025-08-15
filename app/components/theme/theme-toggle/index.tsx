"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9">
        <div className="h-4 w-4" />
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="relative w-9 h-9 rounded-full bg-background border-2 border-border hover:bg-accent transition-colors"
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        <div className="relative w-4 h-4">
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, opacity: 0, scale: 0 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Moon className="h-4 w-4 text-blue-400" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, opacity: 0, scale: 0 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sun className="h-4 w-4 text-yellow-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Animated background circle */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            backgroundColor: isDark
              ? "rgba(59, 130, 246, 0.1)"
              : "rgba(234, 179, 8, 0.1)",
          }}
          transition={{ duration: 0.3 }}
        />
      </Button>
    </motion.div>
  );
}

export function ThemeToggleExpanded() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const { t } = useTranslation("theme");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-muted/50">
        <div className="w-4 h-4 bg-muted animate-pulse rounded" />
        <div className="w-12 h-4 bg-muted animate-pulse rounded" />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.div
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="moon-expanded"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="h-4 w-4 text-blue-400" />
          </motion.div>
        ) : (
          <motion.div
            key="sun-expanded"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="h-4 w-4 text-yellow-500" />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        <motion.span
          key={isDark ? "dark" : "light"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? t("options.dark") : t("options.light")}
          {/* {isDark ? "dark" : "light"} */}
        </motion.span>
      </button>

      {/* Toggle Switch */}
      <motion.div
        className="relative w-10 h-5 bg-muted-foreground/20 rounded-full cursor-pointer"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute top-0.5 w-4 h-4 bg-primary rounded-full shadow-sm"
          animate={{
            x:
              typeof window !== "undefined" &&
              document?.documentElement?.dir === "rtl"
                ? isDark
                  ? -2
                  : -20
                : isDark
                ? 20
                : 2,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.div>
    </motion.div>
  );
}
