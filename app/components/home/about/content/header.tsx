"use client";

import SectionHeader from "@/app/components/section-header";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface AboutHeaderProps {
  description?: string[];
  isInView: boolean;
}

export default function AboutHeader({
  description,
  isInView,
}: AboutHeaderProps) {
  const { t } = useTranslation("about");

  return (
    <motion.div
      className="mb-14 text-center"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { delayChildren: 0.25, staggerChildren: 0.15 },
        },
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div
        className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-black/5 dark:border-white/20 dark:bg-white/5 px-3 py-1 text-xs text-muted-foreground shadow-sm backdrop-blur"
        variants={{
          hidden: { y: 12, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_2px_rgba(52,211,153,.65)] animate-ping mb-0.5" />
        {t("openToCollaboration")}
      </motion.div>

      <SectionHeader title={t("title")} />

      <motion.div
        className="mx-auto mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg"
        variants={{
          hidden: { y: 24, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
      >
        {description?.slice(0, 1).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </motion.div>
    </motion.div>
  );
}
