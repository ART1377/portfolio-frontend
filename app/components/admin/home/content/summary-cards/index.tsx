"use client";

import { SummaryCard } from "@/app/components/summary-card";
import { useLang } from "@/app/context/langContext";
import { AboutData } from "@/app/types/shared/about/aboutData";
import { ContactInfo } from "@/app/types/shared/contact/contactInfo";
import { ExperienceData } from "@/app/types/shared/experience/experience";
import { Project } from "@/app/types/shared/project/project";
import { Skill } from "@/app/types/shared/skill/skill";
import { Submission } from "@/app/types/shared/submission/submission";
import {
  Code,
  NotebookPen,
  Briefcase,
  Contact,
  Mail,
  Info,
} from "lucide-react";
import { useTranslation } from "react-i18next";

type SummaryCardsProps = {
  projects: Project[]; // Replace unknown[] with your actual project type
  skills: Skill[];
  experienceData: ExperienceData;
  submissions: Submission[]; // Replace unknown[] with your actual submission type
  aboutData: AboutData;
};

export default function SummaryCards({
  projects,
  skills,
  experienceData,
  submissions,
  aboutData,
}: SummaryCardsProps) {
  const totalProjects = projects?.length || 0;
  const totalSkills =
    skills?.reduce((sum: number, cat: any) => sum + cat.skills.length, 0) || 0;
  const totalExperiences = experienceData?.experiences.length || 0;
  const submissionsCount = submissions?.length || 0;
  const aboutFeaturesCount = aboutData?.features.length || 0;

  const { t } = useTranslation("dashboard");

  const summaryItems = [
    {
      label: "Projects",
      count: totalProjects,
      icon: <Code className="text-primary" />,
      href: "/admin/projects",
    },
    {
      label: "Skills",
      count: totalSkills,
      icon: <NotebookPen className="text-primary" />,
      href: "/admin/skills",
    },
    {
      label: "Experiences",
      count: totalExperiences,
      icon: <Briefcase className="text-primary" />,
      href: "/admin/experiences",
    },
    {
      label: "Contact Info",
      count: t("Not Set"),
      icon: <Contact className="text-primary" />,
      href: "/admin/contact-info",
    },
    {
      label: "Submissions",
      count: submissionsCount,
      icon: <Mail className="text-primary" />,
      href: "/admin/submissions",
    },
    {
      label: "About Features",
      count: aboutFeaturesCount,
      icon: <Info className="text-primary" />,
      href: "/admin/about",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {summaryItems.map((item) => (
        <SummaryCard
          key={item.label}
          label={item.label}
          count={item.count}
          icon={item.icon}
          href={item.href}
        />
      ))}
    </div>
  );
}
