import { TableHead } from "@/components/ui/table";

export default function TableHeadCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <TableHead className={`px-6 py-4 text-gray-600 ${className ?? ""}`}>
      {children}
    </TableHead>
  );
}
