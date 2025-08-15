"use client";

import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";

export default function ProjectsEditorSkeleton() {
  return (
    <section className="section-container my-10">
      <Card className="max-w-5xl mx-auto">
        {/* Header */}
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>

        <CardContent className="space-y-8">
          {[...Array(2)].map((_, idx) => (
            <Card
              key={idx}
              className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-teal-50/50 to-cyan-50/50 dark:from-teal-950/20 dark:to-cyan-950/20"
            >
              <CardHeader className="border-b border-primary/20 dark:border-primary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <Skeleton className="h-6 w-6 rounded-md" />
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-10 w-full" />

                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-10 w-full" />

                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-10 w-full" />
                  </div>

                  {/* Right Column (Image Upload) */}
                  <div className="space-y-4">
                    <Skeleton className="h-40 w-full rounded-xl" />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-20 w-full rounded-md" />
                </div>

                {/* Technologies */}
                <div className="space-y-2">
                  <Skeleton className="h-6 w-32" />
                  <div className="flex flex-wrap gap-2">
                    {[...Array(3)].map((_, techIdx) => (
                      <Skeleton
                        key={techIdx}
                        className="h-6 w-20 rounded-full"
                      />
                    ))}
                  </div>
                  <Skeleton className="h-10 w-40" />
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Footer Buttons */}
          <div className="flex justify-center gap-4 pt-6">
            <Skeleton className="h-10 w-40 rounded-md" />
            <Skeleton className="h-10 w-40 rounded-md" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
