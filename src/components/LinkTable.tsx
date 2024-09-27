import { ColumnDef, SortingState } from "@tanstack/react-table";
import { SortablePaginatedTable } from "./SortablePaginatedTable";
import { usePaginatedLinks, useUrlSearchParams } from "@/hooks";
import { BaseSyntheticEvent, useMemo, useState } from "react";
import { Pagination } from "./Pagination";
import { formatDate } from "@/utils/common";
import { SortableHeader } from "./SortableHeader";
import { Input } from "./ui/input";

const columns: ColumnDef<ILink>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: () => null,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ cell }) => (
      <div>
        <img
          src={cell.row.original.image}
          alt=""
          className="w-10 h-8 object-cover rounded"
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <SortableHeader column={column}>Title</SortableHeader>
    ),
  },
  {
    accessorKey: "author.username",
    header: "Author",
    enableSorting: false,
  },
  {
    accessorKey: "commentCount",
    header: ({ column }) => (
      <SortableHeader column={column}>Comments</SortableHeader>
    ),
  },
  {
    accessorKey: "votesCount",
    header: ({ column }) => (
      <SortableHeader column={column}>Votes</SortableHeader>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <SortableHeader column={column}>CreatedAt</SortableHeader>
    ),
    cell: ({ cell }) => formatDate(cell.row.original.createdAt),
  },
];

export function LinkTable() {
  const [{ page = 1, searchTerm }, setQueryParams] = useUrlSearchParams<{
    page: number;
    searchTerm: string;
  }>();

  const [sorting, setSorting] = useState<SortingState>([]);

  const { data } = usePaginatedLinks({ page, sorting, searchTerm });

  const onPageChange = (page: number) => setQueryParams({ page });
  const onSearch = (searchTerm: string) => {
    if (page) {
      onPageChange(0);
    }
    setQueryParams({ searchTerm });
  };

  const links = useMemo(() => data?.data || [], [data?.data]);

  return (
    <div className="container mx-auto p-10 flex flex-col gap-4">
      <Input
        className="py-4"
        defaultValue={searchTerm}
        placeholder="Search..."
        onInput={(e: BaseSyntheticEvent) => onSearch(e.target.value)}
      />

      <SortablePaginatedTable
        columns={columns}
        data={links}
        sorting={sorting}
        setSorting={setSorting}
        pagination={
          <Pagination
            currentPage={page}
            onPageChange={onPageChange}
            totalPages={data?.totalPages || 0}
          />
        }
      />
    </div>
  );
}
