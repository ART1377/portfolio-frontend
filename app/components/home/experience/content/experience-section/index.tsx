"use client";

import { motion, Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import ExperienceCard from "./card";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies?: string[];
}

interface ExperienceSectionProps {
  experiences?: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const { t } = useTranslation("experience");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <h3 className="text-2xl font-semibold mb-8">
        {t("sections.experience")}
      </h3>
      <div className="space-y-6">
        {experiences?.map((exp, index) => (
          <motion.div key={index} variants={cardVariants as Variants}>
            <ExperienceCard exp={exp} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
