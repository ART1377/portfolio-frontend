// ProjectsContent.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionParallax } from "@/app/components/parallax/section-parallax";
import { Project } from "@/app/types/shared/project/project";
import { ProjectCard } from "./card";
import ProjectContentHeader from "./header";

interface ProjectProps {
  projects: Project[];
}

export function ProjectsContent({ projects }: ProjectProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="projects" className="py-20" ref={ref}>
      <div className="section-container">
        <ProjectContentHeader isInView={isInView} />
        <SectionParallax speed={0.4} direction="down">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                isInView={isInView}
              />
            ))}
          </motion.div>
        </SectionParallax>
      </div>
    </section>
  );
}
