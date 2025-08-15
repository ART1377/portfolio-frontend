"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";
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

  const [tilt, setTilt] = useState({ rx: 0, ry: 0, t: "0,0,0" });

  function handleMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 10;
    const rx = (0.5 - py) * 10;
    setTilt({ rx, ry, t: `${(px - 0.5) * 12}px, ${(py - 0.5) * 12}px, 0` });
  }

  function handleLeave() {
    setTilt({ rx: 0, ry: 0, t: "0,0,0" });
  }

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
          <motion.div key={index} variants={cardVariants as any}>
            <ExperienceCard exp={exp} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
