import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-pink-200 to-purple-300 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Search bar skeleton */}
        <div className="mb-8 flex justify-center">
          <Skeleton className="h-12 w-80 rounded-full" />
        </div>

        {/* Split weather cards skeleton */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Day side skeleton */}
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30">
            <div className="text-center space-y-4">
              <Skeleton className="h-8 w-24 mx-auto" />
              <Skeleton className="h-16 w-16 rounded-full mx-auto" />
              <Skeleton className="h-12 w-32 mx-auto" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40 mx-auto" />
                <Skeleton className="h-4 w-36 mx-auto" />
                <Skeleton className="h-4 w-32 mx-auto" />
              </div>
            </div>
          </div>

          {/* Night side skeleton */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <div className="text-center space-y-4">
              <Skeleton className="h-8 w-24 mx-auto" />
              <Skeleton className="h-16 w-16 rounded-full mx-auto" />
              <Skeleton className="h-12 w-32 mx-auto" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40 mx-auto" />
                <Skeleton className="h-4 w-36 mx-auto" />
                <Skeleton className="h-4 w-32 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
