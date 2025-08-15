"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Course } from "@/app/types/shared/experience/experience";
import { cn } from "@/app/lib/utils/cn/cn";

type Props = {
  course: Course;
};

const CourseCard = ({ course }: Props) => {
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
        "relative overflow-hidden rounded-2xl hover:shadow-lg transition-shadow",
        // you can add more classes here if needed
      )}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h5 className="font-medium">{course.name}</h5>
            <p className="text-sm text-muted-foreground">{course.org}</p>
          </div>
          <Badge variant="outline">{course.year}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
