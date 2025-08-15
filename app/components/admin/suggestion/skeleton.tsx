"use client";

import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";

export default function SubmissionsSkeleton() {
  return (
    <section className="section-container my-10">
      <Card className="max-w-5xl mx-auto">
        {/* Header Skeleton */}
        <CardHeader className="pb-4">
          <Skeleton className="h-6 w-64 mb-2" />
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <div className="rounded-xl border bg-white/80 dark:bg-slate-800/70">
            {/* Table Skeleton */}
            <table className="w-full">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  {[...Array(6)].map((_, idx) => (
                    <th key={idx} className="p-3">
                      <Skeleton className="h-4 w-20" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, rowIdx) => (
                  <tr key={rowIdx} className="hover:bg-muted transition-colors">
                    {[...Array(6)].map((_, colIdx) => (
                      <td key={colIdx} className="p-3">
                        <Skeleton className="h-4 w-full" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
