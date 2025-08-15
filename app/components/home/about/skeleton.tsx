import { Skeleton } from "@/app/components/ui/skeleton";

export default function AboutSkeleton() {
  return (
    <section id="about">
      <div className="section-container py-20">
        <div className="text-center mb-16">
          <Skeleton className="h-8 w-48 mx-auto mb-4" />
          <div className="space-y-4 max-w-2xl mx-auto">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-3">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
            <div className="flex flex-wrap gap-2 mt-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-20 rounded-full" />
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-6 border rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
