import { TableCell as ShadcnTableCell } from "@/components/ui/table";

export default function TableCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ShadcnTableCell className={`px-6 py-4 ${className ?? ""}`}>
      {children}
    </ShadcnTableCell>
  );
}
