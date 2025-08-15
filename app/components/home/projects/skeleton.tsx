import { Skeleton } from "@/app/components/ui/skeleton";

export default function ProjectsSkeleton() {
  return (
    <section id="projects" className="py-20">
      <div className="section-container">
        <div className="text-center mb-16">
          <Skeleton className="h-8 w-60 mx-auto mb-4" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden border shadow-sm space-y-4"
            >
              <Skeleton className="h-48 w-full" />
              <div className="px-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="px-4 py-2 flex flex-wrap gap-2">
                {[...Array(3)].map((_, j) => (
                  <Skeleton key={j} className="h-6 w-16 rounded-full" />
                ))}
              </div>
              <div className="px-4 pb-4 flex gap-2">
                <Skeleton className="h-8 w-full rounded-md" />
                <Skeleton className="h-8 w-10 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
