"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Course } from "@/app/types/shared/experience/experience";
import CourseCard from "./card";

interface CoursesSectionProps {
  courses?: Course[];
}

export function CoursesSection({ courses }: CoursesSectionProps) {
  const { t } = useTranslation("experience");

  return (
    <motion.div
      className="mt-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <h4 className="text-xl font-semibold mb-6">{t("sections.courses")}</h4>
      <div className="space-y-4">
        {courses?.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </motion.div>
  );
}
