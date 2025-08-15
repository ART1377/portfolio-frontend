import { Skeleton } from "@/app/components/ui/skeleton";

export default function SkillsSkeleton() {
  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <Skeleton className="h-8 w-48 mx-auto mb-4" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-6 border rounded-lg shadow-sm space-y-4">
              <Skeleton className="h-6 w-40 mx-auto mb-2" />
              {[...Array(4)].map((_, j) => (
                <div key={j} className="space-y-1">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-10" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
