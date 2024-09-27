import { Column } from "@tanstack/react-table";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

export function SortableHeader({
  column,
  children,
}: {
  children: ReactNode;
  column: Column<ILink, unknown>;
}) {
  return (
    <Button
      className="w-full flex justify-start"
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {children}
      {column.getIsSorted() === "asc" ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === "desc" ? (
        <ArrowDown className="ml-2 h-4 w-4" />
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}
