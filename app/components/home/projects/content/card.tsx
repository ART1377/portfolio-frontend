"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/app/types/shared/project/project";
import { useTranslation } from "react-i18next";
import { useState } from "react";

type ProjectCardProps = {
  project: Project;
  index: number;
  isInView: boolean;
};

export function ProjectCard({ project, index, isInView }: ProjectCardProps) {
  const { t } = useTranslation("projects");

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

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div variants={cardVariants as any}>
      <Card
        className="overflow-hidden hover:shadow-lg transition-shadow group h-full"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out",
        }}
      >
        <motion.div
          className="relative h-48 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={
              project.image
                ? `http://localhost:4000${project.image}`
                : "/placeholder.svg"
            }
            alt={project.title}
            fill
            className="object-cover transition-transform group-hover:scale-110 duration-300"
          />
          <motion.div
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <div className="flex gap-2">
              {project.liveUrl && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="secondary">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                </motion.div>
              )}
              {project.githubUrl && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="secondary">
                      <Github className="h-4 w-4" />
                    </Button>
                  </a>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

        <div className="flex flex-col justify-between h-[calc(100%-192px)]">
          <CardHeader>
            <CardTitle className="text-xl">{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              className="flex flex-wrap gap-2 mb-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              {project.technologies.map((tech, techIndex) => (
                <motion.div
                  key={techIndex}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.5 + index * 0.1 + techIndex * 0.05,
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Badge variant="secondary" className="text-xs">
                    <span className="font-medium">{tech}</span>
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex gap-2">
              {project.liveUrl && (
                <motion.div
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" className="w-full">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t("buttons.liveDemo")}
                    </Button>
                  </a>
                </motion.div>
              )}
              {project.githubUrl && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="outline">
                      <Github className="h-4 w-4" />
                    </Button>
                  </a>
                </motion.div>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}
