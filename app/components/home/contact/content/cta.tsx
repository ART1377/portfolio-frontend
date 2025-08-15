"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/app/components/ui/card";
import { useTranslation } from "react-i18next";

export function ContactCTA({ isInView }: { isInView: boolean }) {
  const { t } = useTranslation("contact");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <h4 className="font-semibold mb-2">{t("ctaTitle")}</h4>
          <p className="text-muted-foreground text-sm">{t("ctaDescription")}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
