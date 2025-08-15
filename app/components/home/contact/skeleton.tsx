import { Skeleton } from "@/app/components/ui/skeleton";

export default function ContactSkeleton() {
  return (
    <section className="py-20">
      <div className="section-container">
        <div className="text-center mb-16">
          <Skeleton className="h-10 w-64 mx-auto mb-4 rounded-md" />
          <Skeleton className="h-5 w-3/4 mx-auto rounded-md" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Form Skeleton */}
          <div className="h-full flex flex-col justify-center">
            <div className="mb-6">
              <Skeleton className="h-7 w-48 mb-2 rounded-md" />
              <Skeleton className="h-4 w-72 rounded-md" />
            </div>

            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Skeleton className="h-10 rounded-md" />
                <Skeleton className="h-10 rounded-md" />
              </div>
              <Skeleton className="h-10 rounded-md" />
              <Skeleton className="h-24 rounded-md" />
              <Skeleton className="h-12 w-full rounded-md mt-2" />
            </form>
          </div>

          {/* Right: Contact Info Skeleton */}
          <div className="space-y-8">
            <div>
              <Skeleton className="h-7 w-44 mb-6 rounded-md" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-64 rounded-md" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Skeleton className="h-7 w-32 mb-4 rounded-md" />
              <div className="flex space-x-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-10 w-10 rounded-full"
                  />
                ))}
              </div>
            </div>

            <div className="mt-4">
              <Skeleton className="h-7 w-40 mb-2 rounded-md" />
              <Skeleton className="h-12 w-full rounded-md" />
              <Skeleton className="h-4 w-11/12 mt-2 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
