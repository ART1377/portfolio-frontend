"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/app/components/ui/card";
import { SkillCategory } from "@/app/types/shared/skill/skill";
import {
  BarChart,
  Code,
  Database,
  Cloud,
  LayoutDashboard,
  Settings,
  GitBranch,
  Palette,
  BrainCircuit,
  Server,
} from "lucide-react";
import { useState } from "react";

interface SkillCardProps {
  category: SkillCategory;
  index: number;
  isInView: boolean;
}

// Function to get an icon based on category title
const getCategoryIcon = (title: string) => {
  switch (title.toLowerCase()) {
    case "frontend":
      return Code;
    case "backend":
      return Server;
    case "cloud & devops":
      return Cloud;
    case "data science":
      return BarChart;
    case "tools":
      return Settings;
    case "version control":
      return GitBranch;
    case "design":
      return Palette;
    case "ai/ml":
      return BrainCircuit;
    case "databases":
      return Database;
    default:
      return LayoutDashboard; // Default icon
  }
};

export function SkillCard({ category, index, isInView }: SkillCardProps) {
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const Icon = getCategoryIcon(category.title);

  // Tilt state
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  function handleMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 10; // rotateY
    const rx = (0.5 - py) * 10; // rotateX
    setTilt({ rx, ry });
  }

  function handleLeave() {
    setTilt({ rx: 0, ry: 0 });
  }

  return (
    <motion.div
      variants={cardVariants as any}
      className="transform hover:-translate-y-3 transition-transform duration-300 ease-in-out"
    >
      <Card
        className="h-full flex flex-col bg-card/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow transition-all duration-300 border border-transparent"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out",
        }}
      >
        <CardContent className="p-8 flex-1 flex flex-col">
          <motion.div
            className="flex flex-col items-center text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
            transition={{ duration: 0.7, delay: 0.4 + index * 0.1 }}
          >
            {Icon && <Icon className="w-12 h-12 text-primary mb-4" />}
            <h3 className="text-3xl font-extrabold text-foreground leading-tight">
              {category.title}
            </h3>
          </motion.div>
          <div className="space-y-5 flex-1">
            {category.skills.map((skill, skillIndex) => (
              <motion.div
                key={skillIndex}
                initial={{ opacity: 0, x: -30 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
                }
                transition={{
                  duration: 0.7,
                  delay: 0.6 + index * 0.1 + skillIndex * 0.07,
                }}
              >
                <div className="flex justify-between items-end mb-1">
                  <span className="text-lg font-medium text-foreground">
                    {skill.name}
                  </span>
                  <span className="text-base font-semibold text-foreground">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-muted-foreground/30 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-primary to-primary/70 h-full rounded-full shadow-sm"
                    initial={{ width: 0 }}
                    animate={
                      isInView ? { width: `${skill.level}%` } : { width: 0 }
                    }
                    transition={{
                      duration: 1.2,
                      delay: 0.9 + index * 0.1 + skillIndex * 0.07,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
