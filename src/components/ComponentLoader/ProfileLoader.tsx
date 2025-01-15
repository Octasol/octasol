import { Skeleton } from "@/components/ui/skeleton";

export function ProfileLoader() {
  return (
    <>
      <div className="w-full h-full">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="flex items-center space-x-4 py-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[1000px]" />
                <Skeleton className="h-4 w-[1000px]" />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
