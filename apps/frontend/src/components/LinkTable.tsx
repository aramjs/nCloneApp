import { CellContext, ColumnDef, SortingState } from "@tanstack/react-table";
import {
  useLinkCreate,
  useLinkUpdate,
  usePaginatedLinks,
  useUrlSearchParams,
} from "@/hooks";
import { BaseSyntheticEvent, useMemo, useState } from "react";
import { Pagination } from "./Pagination";
import { formatDate } from "@/utils/common";
import { Input } from "./ui/input";
import {
  EditableTextCell,
  SortableHeader,
  SortablePaginatedTable,
} from "./Table";
import { Button } from "./ui/button";
import { useModal } from "@/contexts";
import { FetchListParams } from "@/utils/api";

const EditableCellWrapper = ({ cell }: CellContext<ILink, unknown>) => {
  const { mutateAsync: onUpdate } = useLinkUpdate();

  return (
    <EditableTextCell
      initialText={cell.row.original.title}
      onSave={(title) => onUpdate({ id: cell.row.original.id, title })}
    />
  );
};

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
    cell: EditableCellWrapper,
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
  const [{ page = 1, searchTerm = "" }, setQueryParams] = useUrlSearchParams<{
    page: number;
    searchTerm: string;
  }>();

  const [sorting, setSorting] = useState<SortingState>([]);

  const params: FetchListParams = { page, sorting, searchTerm };
  const { mutateAsync: onCreate } = useLinkCreate(params);
  const { data } = usePaginatedLinks(params);

  const { openModal, closeModal } = useModal();

  const onPageChange = (page: number) => setQueryParams({ page });
  const onSearch = (searchTerm: string) => {
    if (page) {
      onPageChange(1);
    }
    setQueryParams({ searchTerm });
  };

  const links = useMemo(() => data?.data || [], [data?.data]);

  const onAddLink = () => {
    openModal("CreateLinkModal", {
      onSubmit: onCreate,
      onClose: closeModal,
    });
  };

  return (
    <div className="container mx-auto p-10 flex flex-col gap-4">
      <div className="flex gap-4">
        <Input
          className="py-4"
          defaultValue={searchTerm}
          placeholder="Search..."
          onInput={(e: BaseSyntheticEvent) => onSearch(e.target.value)}
        />

        <Button onClick={onAddLink}>Add Link</Button>
      </div>

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
