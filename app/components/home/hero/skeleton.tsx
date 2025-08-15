import { Skeleton } from "@/app/components/ui/skeleton";

export default function HeroSkeleton() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 relative">
      <div className="section-container text-center relative z-10">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-gray-300 to-gray-200 animate-pulse" />
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-48 mx-auto mb-8" />
          <Skeleton className="h-5 w-[80%] mx-auto mb-2" />
          <Skeleton className="h-5 w-[60%] mx-auto mb-8" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Skeleton className="h-10 w-40 rounded-md" />
          <Skeleton className="h-10 w-40 rounded-md" />
        </div>

        <div className="flex justify-center space-x-6 mb-12">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>

        <Skeleton className="h-10 w-10 mx-auto rounded-full" />
      </div>
    </section>
  );
}
