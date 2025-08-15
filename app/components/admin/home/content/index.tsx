"use client";

import { motion } from "framer-motion";
import SummaryCards from "./summary-cards";
import SubmissionsTable from "./submissions-table";
import ExperiencePreview from "./experience-preview";

interface AdminDashboardProps {
  projects: any[];
  skills: any[];
  experienceData: any;
  contactInfo: any;
  submissions: any[];
  aboutData: any;
}

export default function AdminDashboardContent({
  projects,
  skills,
  experienceData,
  contactInfo,
  submissions,
  aboutData,
}: AdminDashboardProps) {
  return (
    <section className="section-container my-10 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <SummaryCards
          projects={projects}
          skills={skills}
          experienceData={experienceData}
          contactInfo={contactInfo}
          submissions={submissions}
          aboutData={aboutData}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <SubmissionsTable submissions={submissions} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <ExperiencePreview experienceData={experienceData} />
      </motion.div>
    </section>
  );
}
