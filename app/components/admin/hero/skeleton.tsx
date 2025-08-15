"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";

export default function HeroEditorSkeleton() {
  return (
    <section className="section-container !max-w-5xl mx-auto p-4 md:p-6 space-y-8 my-10">
      {/* Header (AdminSectionHeader mimic) */}
      <Card className="w-full">
        <CardHeader className="flex flex-row justify-between items-center p-4 md:p-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-lg" /> {/* Icon */}
            <Skeleton className="h-6 w-48" /> {/* Title */}
          </div>
          <Skeleton className="h-10 w-36" /> {/* Language select */}
        </CardHeader>
      </Card>

      {/* Hero Form - Two Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-40" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Professional Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-48" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-24 w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="lg:col-span-2">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Resume Uploader */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-5 w-40" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="space-y-4 p-4 rounded-lg border border-[hsl(var(--border))]"
            >
              <Skeleton className="h-4 w-32" /> {/* Label */}
              <Skeleton className="h-10 w-full" /> {/* File input */}
              <div className="flex gap-3">
                <Skeleton className="h-10 w-28" /> {/* Upload btn */}
                <Skeleton className="h-10 w-28" /> {/* Download btn */}
              </div>
              <Skeleton className="h-2 w-full rounded-full" /> {/* Progress bar */}
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
