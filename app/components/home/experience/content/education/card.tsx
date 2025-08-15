"use client";

import { Education } from "@/app/types/shared/experience/experience";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { cn } from "@/app/lib/utils/cn/cn";

type Props = {
  edu: Education;
};

const EducationCard = ({ edu }: Props) => {
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
    <Card
      className={cn(
        "relative overflow-hidden rounded-2xl hover:shadow-lg transition-shadow"
      )}
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
            <CardTitle className="text-xl">{edu.degree}</CardTitle>
            <CardDescription className="text-lg font-medium text-primary mt-1">
              {edu.school}
            </CardDescription>
          </div>
          <Badge variant="outline" className="min-w-fit">
            {edu.period}
          </Badge>
        </div>
      </CardHeader>
      <CardContent >
        <p className="text-muted-foreground">{edu.description}</p>
      </CardContent>
    </Card>
  );
};

export default EducationCard;
