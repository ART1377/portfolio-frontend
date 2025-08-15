"use client";

import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";

export default function ExperienceEditorSkeleton() {
  return (
    <section className="max-w-5xl mx-auto my-10">
      <Card className="border-0 bg-gradient-to-br from-slate-50/50 to-gray-50/50 dark:from-slate-950/50 dark:to-gray-950/50 shadow-lg">
        {/* Header */}
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>

        <CardContent className="space-y-12 p-4 md:p-6">
          {/* Repeat sections: Experiences, Education, Courses */}
          {[...Array(3)].map((_, sectionIdx) => (
            <div key={sectionIdx} className="space-y-6">
              {/* Section title */}
              <Skeleton className="h-6 w-48 mb-4" />

              {[...Array(2)].map((_, itemIdx) => (
                <Card
                  key={itemIdx}
                  className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 shadow-sm"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-6 w-6 rounded-md" />
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-20 w-full rounded-md" />
                    <div className="flex gap-2">
                      {[...Array(3)].map((_, techIdx) => (
                        <Skeleton key={techIdx} className="h-6 w-20 rounded-full" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add button skeleton */}
              <Skeleton className="h-10 w-40 rounded-md" />
            </div>
          ))}

          {/* Save button skeleton */}
          <div className="flex justify-end pt-6 border-t border-border/50">
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
