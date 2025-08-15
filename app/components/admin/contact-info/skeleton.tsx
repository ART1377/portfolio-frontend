import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";

const ContactInfoSkeleton = () => {
  return (
    <section className="section-container my-10">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-1/2" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div className="space-y-2" key={i}>
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}

          <div className="pt-4 border-t">
            <Skeleton className="h-5 w-1/2 mb-2" />
            {[...Array(3)].map((_, i) => (
              <div className="space-y-2" key={i}>
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ContactInfoSkeleton;
