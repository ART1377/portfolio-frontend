import { Skeleton } from "@/app/components/ui/skeleton";

export default function ExperienceSkeleton() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <Skeleton className="h-8 w-72 mx-auto mb-4" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          <div>
            <Skeleton className="h-6 w-40 mb-8" />
            <div className="space-y-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="rounded-xl border p-4 space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[...Array(3)].map((_, j) => (
                      <Skeleton
                        key={j}
                        className="h-6 w-16 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Courses */}
          <div>
            <Skeleton className="h-6 w-32 mb-8" />
            <div className="space-y-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="rounded-xl border p-4 space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>

            {/* Courses */}
            <div className="mt-12">
              <Skeleton className="h-5 w-32 mb-6" />
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="rounded-xl border p-4 flex justify-between items-center">
                    <div>
                      <Skeleton className="h-4 w-28 mb-1" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
