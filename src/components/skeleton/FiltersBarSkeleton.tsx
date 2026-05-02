import { Skeleton } from "@/components/ui/skeleton";

export default function FiltersBarSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-12 w-[160px] rounded-md" />
        </div>
      </div>
    </div>
  );
}
