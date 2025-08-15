"use client";

import { Skeleton } from "@/app/components/ui/skeleton";

export default function AdminDashboardSkeleton() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="p-6 border rounded-2xl bg-white/80 dark:bg-slate-800/70 space-y-3"
          >
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>

      {/* Submissions Table */}
      <div>
        <Skeleton className="h-6 w-64 mb-4" />
        <div className="rounded-xl border bg-white/80 dark:bg-slate-800/70 overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-4 bg-muted">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
          <div className="space-y-2 p-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((__, j) => (
                  <Skeleton key={j} className="h-4 w-full" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Preview */}
      <div>
        <Skeleton className="h-6 w-64 mb-4" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="border bg-white/80 dark:bg-slate-800/70 rounded-xl p-4 space-y-2"
            >
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
