"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";

export default function AboutEditorSkeleton() {
  return (
    <section className="section-container my-10">
      <Card className="max-w-5xl mx-auto border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-slate-900 dark:to-slate-800">
        {/* Header */}
        <CardHeader className="flex flex-row justify-between items-center p-4 md:p-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-lg" /> {/* Icon */}
            <Skeleton className="h-6 w-48" /> {/* Title */}
          </div>
          <Skeleton className="h-10 w-36" /> {/* Language select */}
        </CardHeader>

        <CardContent className="space-y-8 p-4 md:p-6">
          {/* Description Sub-Card */}
          <div className="p-4 rounded-lg border space-y-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Skeleton className="h-8 w-8 rounded-lg" /> {/* Icon */}
              <Skeleton className="h-5 w-32" /> {/* Section Title */}
            </div>
            {[1, 2].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-10 w-full" /> {/* Input */}
                <Skeleton className="h-8 w-20" /> {/* Remove btn */}
              </div>
            ))}
            <Skeleton className="h-8 w-40" /> {/* Add btn */}
          </div>

          {/* Skills Sub-Card */}
          <div className="p-4 rounded-lg border space-y-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-5 w-28" />
            </div>
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-2">
                <Skeleton className="h-10 flex-1" /> {/* Input */}
                <Skeleton className="h-8 w-20" /> {/* Remove btn */}
              </div>
            ))}
            <Skeleton className="h-8 w-40" /> {/* Add btn */}
          </div>

          {/* Features Sub-Card */}
          <div className="p-4 rounded-lg border space-y-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-5 w-28" />
            </div>
            {[1, 2].map((i) => (
              <div
                key={i}
                className="p-4 border rounded-lg space-y-3"
              >
                <Skeleton className="h-10 w-full" /> {/* Feature title */}
                <Skeleton className="h-20 w-full" /> {/* Feature description */}
                <Skeleton className="h-10 w-full" /> {/* Icon input */}
                <Skeleton className="h-8 w-20" /> {/* Remove btn */}
              </div>
            ))}
            <Skeleton className="h-8 w-40" /> {/* Add btn */}
          </div>
        </CardContent>

        {/* Save button */}
        <CardContent className="flex justify-center border-t border-border/50 pt-4">
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    </section>
  );
}
