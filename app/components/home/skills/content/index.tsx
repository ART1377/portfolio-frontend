"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionParallax } from "@/app/components/parallax/section-parallax";
import { SkillCategory } from "@/app/types/shared/skill/skill";
import { SkillCard } from "./card";
import SkillsContentHeader from "./header";
import { InfiniteSkillQueue } from "./infinite-skill-queue";

interface Props {
  skills: SkillCategory[];
}

export function SkillsContent({ skills }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  // const allSkillNames: string[] = skills.flatMap((category) =>
  //   category.skills.map((skill) => skill.name)
  // );

  return (
    <section id="skills" className="py-20 bg-muted/30" ref={ref}>
      <div className="section-container">
        <SkillsContentHeader isInView={isInView} />
        <SectionParallax speed={0.3}>
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {skills.map((category, index) => (
              <SkillCard
                key={index}
                category={category}
                index={index}
                isInView={isInView}
              />
            ))}
          </motion.div>
        </SectionParallax>
      </div>
      {/* <InfiniteSkillQueue skills={allSkillNames} /> */}
    </section>
  );
}
