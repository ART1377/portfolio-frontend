"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Loading() {
  const { t } = useTranslation("loading"); 

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
      >
        <motion.h1
          className="text-5xl font-bold text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {t("loading", "Loading ...")}
        </motion.h1>
      </motion.div>
    </AnimatePresence>
  );
}
