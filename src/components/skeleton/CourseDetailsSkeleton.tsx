import { Skeleton } from '../ui/skeleton';

export default function CourseDetailsSkeleton() {
return (
    <div className="space-y-5 pt-2">
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-10 h-3" />
            <Skeleton className="w-16 h-5 rounded-full" />
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-24 h-3" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="w-14 h-6 rounded-md" />
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-14 h-3" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="w-28 h-4" />
          <Skeleton className="w-32 h-3" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-28 h-3" />
          </div>
          <Skeleton className="w-8 h-5 rounded-full" />
        </div>
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-3 py-2 flex">
            <Skeleton className="w-12 h-3" />
            <Skeleton className="w-12 h-3 ml-auto" />
            <Skeleton className="w-12 h-3 ml-auto" />
          </div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="px-3 py-2 flex border-t border-gray-100">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-32 h-4 ml-auto" />
              <Skeleton className="w-20 h-4 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
