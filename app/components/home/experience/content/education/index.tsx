"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import EducationCard from "./card";

interface Education {
  degree: string;
  school: string;
  period: string;
  description: string;
}

interface EducationSectionProps {
  education?: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  const { t } = useTranslation("experience");

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <h3 className="text-2xl font-semibold mb-8">{t("sections.education")}</h3>
      <div className="space-y-6">
        {education?.map((edu, index) => (
        <EducationCard key={index} edu={edu} />
        ))}
      </div>
    </motion.div>
  );
}
