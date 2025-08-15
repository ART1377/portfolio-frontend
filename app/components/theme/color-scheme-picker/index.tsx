"use client";

import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check, Sparkles } from "lucide-react";
import { useColorScheme } from "@/app/components/theme/theme-provider";
import { colorSchemes, type ColorScheme } from "@/app/lib/theme/color-schemes";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import { useTranslation } from "react-i18next";

export function ColorSchemePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const { colorScheme, setColorScheme } = useColorScheme();
  const { t } = useTranslation("theme");

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useClickOutside([menuRef, buttonRef], () => setIsOpen(false), isOpen);

  const handleSchemeChange = (scheme: ColorScheme) => {
    setColorScheme(scheme);
    const schemeData = colorSchemes[scheme];
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
  };

  return (
    <div className="fixed bottom-36 right-8 z-50">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="rounded-full shadow-lg bg-primary hover:bg-primary/90"
          aria-label={t("color_schemes")}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Palette className="h-4 w-4" />
          </motion.div>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            className="absolute bottom-16 right-0 w-96"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="shadow-xl border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-x-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">
                    {t("color_schemes")}
                  </CardTitle>
                </div>
                <CardDescription>{t("color_description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(colorSchemes).map(([key, scheme]) => {
                    const isActive = colorScheme === key;
                    const schemeData = colorSchemes[key as ColorScheme];

                    return (
                      <motion.div
                        key={key}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative"
                      >
                        <Button
                          variant={isActive ? "default" : "outline"}
                          className="w-full h-auto p-3 flex flex-col items-start space-y-2"
                          onClick={() => handleSchemeChange(key as ColorScheme)}
                        >
                          <div className="flex space-x-1 w-full">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{
                                backgroundColor: `hsl(${schemeData.primary})`,
                              }}
                            />
                            <div className="flex-1" />
                            {isActive && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Check className="h-4 w-4" />
                              </motion.div>
                            )}
                          </div>
                          <div className="text-start w-full">
                            <div className="font-medium text-sm">
                              {t(`schemes.${key}.name`)}
                            </div>
                            <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                              {t(`schemes.${key}.description`)}
                            </div>
                          </div>
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {t("current_scheme")}: {t(`schemes.${colorScheme}.name`)}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {t("theme_count", {
                        count: Object.keys(colorSchemes).length,
                      })}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
