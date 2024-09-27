import { ColumnDef, SortingState } from "@tanstack/react-table";
import { SortablePaginatedTable } from "./SortablePaginatedTable";
import { usePaginatedLinks, useUrlSearchParams } from "@/hooks";
import { useMemo, useState } from "react";
import { Pagination } from "./Pagination";
import { formatDate } from "@/utils/common";
import { SortableHeader } from "./SortableHeader";

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
          className="w-8 h-7 object-cover rounded"
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
  const [{ page = 1 }, setQueryParams] = useUrlSearchParams<{
    page: number;
  }>();

  const [sorting, setSorting] = useState<SortingState>([]);

  const { data } = usePaginatedLinks(page, sorting);

  const onPageChange = (page: number) => setQueryParams({ page });

  const links = useMemo(() => data?.data || [], [data?.data]);

  console.log(sorting);

  return (
    <div className="container mx-auto">
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
