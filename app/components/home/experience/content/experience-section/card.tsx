import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Experience } from "@/app/types/shared/experience/experience";

export default function ExperienceCard({ exp }: { exp: Experience }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  function handleMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 10;
    const rx = (0.5 - py) * 10;
    setTilt({ rx, ry });
  }

  function handleLeave() {
    setTilt({ rx: 0, ry: 0 });
  }

  return (
    <motion.div className="group perspective-1000">
      <Card
        className="relative overflow-hidden rounded-2xl hover:shadow-lg transition-shadow"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{exp.title}</CardTitle>
              <CardDescription className="text-lg font-medium text-primary mt-1">
                {exp.company}
              </CardDescription>
            </div>
            <Badge variant="outline" className="min-w-fit">
              {exp.period}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{exp.description}</p>
          <div className="flex flex-wrap gap-2">
            {exp.technologies?.map((tech, techIndex) => (
              <Badge key={techIndex} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
