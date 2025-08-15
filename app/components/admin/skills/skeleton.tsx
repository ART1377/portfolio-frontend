"use client";

import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";

export default function SkillsEditorSkeleton() {
  return (
    <section className="section-container my-10">
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-slate-800 dark:to-slate-700/50 mx-auto max-w-5xl">
        {/* Header */}
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>

        {/* Categories */}
        <CardContent className="space-y-6 p-4 md:p-6">
          {[...Array(3)].map((_, catIdx) => (
            <div
              key={catIdx}
              className="p-4 bg-gradient-to-br from-white to-gray-50/50 dark:from-slate-800 dark:to-slate-700/50 rounded-lg border border-gray-100 dark:border-slate-600 space-y-4"
            >
              {/* Category header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <Skeleton className="w-8 h-8 rounded-md" />
              </div>

              {/* Skills */}
              <div className="space-y-4">
                {[...Array(3)].map((_, skillIdx) => (
                  <div
                    key={skillIdx}
                    className="p-4 bg-gradient-to-r from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-lg border border-gray-100 dark:border-slate-600 space-y-3"
                  >
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-20" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="w-8 h-8 rounded-md" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                  </div>
                ))}

                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </CardContent>

        {/* Footer buttons */}
        <CardContent className="flex gap-4 justify-center pt-6 border-t border-border/50">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
        </CardContent>
      </Card>
    </section>
  );
}
