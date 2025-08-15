"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";

export default function SubmissionsSkeleton() {
  return (
    <section className="section-container my-10">
      <Card className="max-w-5xl mx-auto">
        <CardContent className="overflow-x-auto">
          <div className="rounded-xl border bg-white/80 dark:bg-slate-800/70 p-4">
            {/* Table Header Skeleton */}
            <div className="grid grid-cols-6 gap-4 mb-3">
              {[...Array(6)].map((_, idx) => (
                <Skeleton key={idx} className="h-6 w-full rounded-md" />
              ))}
            </div>

            {/* Table Rows Skeleton */}
            {[...Array(5)].map((_, rowIdx) => (
              <div
                key={rowIdx}
                className="grid grid-cols-6 gap-4 mb-2 animate-pulse"
              >
                {[...Array(6)].map((__, colIdx) => (
                  <Skeleton key={colIdx} className="h-5 w-full rounded-md" />
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
