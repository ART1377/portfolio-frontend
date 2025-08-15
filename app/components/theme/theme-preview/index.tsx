"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { motion } from "framer-motion";
import { colorSchemes, type ColorScheme } from "@/app/lib/theme/color-schemes";
import { useColorScheme } from "@/app/components/theme/theme-provider";
import { useTranslation } from "react-i18next";
import { cn } from "@/app/lib/utils/cn/cn";
import { useLang } from "@/app/context/langContext";

interface ThemePreviewProps {
  scheme: ColorScheme;
  isActive: boolean;
  onClick: () => void;
}

export function ThemePreview({ scheme, isActive, onClick }: ThemePreviewProps) {
  const schemeData = colorSchemes[scheme];
  const { setColorScheme } = useColorScheme();
  const { lang } = useLang();
  const { t } = useTranslation("theme");

  const handleInternalClick = () => {
    setColorScheme(scheme);

    document.documentElement.style.setProperty("--primary", schemeData.primary);
    document.documentElement.style.setProperty(
      "--primary-foreground",
      schemeData.primaryForeground
    );
    document.documentElement.style.setProperty("--ring", schemeData.primary);
    document.documentElement.style.transition = "all 0.3s ease";

    setTimeout(() => {
      document.documentElement.style.transition = "";
    }, 300);

    onClick();
  };

  return (
    <motion.div
      role="button"
      aria-pressed={isActive}
      tabIndex={0}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg"
      onClick={handleInternalClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleInternalClick();
        }
      }}
    >
      <Card
        className={cn(
          "overflow-hidden transition-all",
          isActive
            ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg"
            : "hover:shadow-md"
        )}
      >
        <CardContent className="p-3 sm:p-4">
          {/* Color Preview */}
          <div
            title={`HSL: ${schemeData.primary}`}
            className="h-16 rounded-lg mb-3"
            style={{ backgroundColor: `hsl(${schemeData.primary})` }}
          />

          {/* Theme Info */}
          <div className="space-y-2">
            <div
              className={`flex items-center justify-between ${
                lang === "fa" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <h3 className="font-medium text-sm">
                {t(`schemes.${scheme}.name`)}
              </h3>
              {isActive && (
                <Badge variant="default" className="text-xs">
                  {t("active", "Active")}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {t(`schemes.${scheme}.description`)}
            </p>
          </div>

          {/* Mini Component Preview */}
          <div className="mt-3 space-y-2">
            <div className="flex space-x-2">
              <div
                className="h-2 rounded flex-1"
                style={{ backgroundColor: `hsl(${schemeData.primary} / 0.2)` }}
              />
              <div
                className="h-2 rounded flex-1"
                style={{ backgroundColor: `hsl(${schemeData.primary} / 0.4)` }}
              />
              <div
                className="h-2 rounded w-8"
                style={{ backgroundColor: `hsl(${schemeData.primary})` }}
              />
            </div>
            <div className="flex space-x-1">
              <div
                className="h-1 rounded flex-1"
                style={{ backgroundColor: `hsl(${schemeData.primary} / 0.3)` }}
              />
              <div
                className="h-1 rounded flex-1"
                style={{ backgroundColor: `hsl(${schemeData.primary} / 0.5)` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
