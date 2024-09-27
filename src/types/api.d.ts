type IOptions = {
  page?: number;
  limit?: number;
};

type IPage<T> = {
  data: T[];
  perPage: number;
  totalItems: number;
  totalPages: number;
  currentPage: number;
};

type InfiniteQueryOptions<T> = Partial<
  Omit<
    import("@tanstack/react-query").DefinedInitialDataInfiniteOptions<
      InfiniteQueryResponse<T>
    >,
    "queryFn" | "getNextPageParam" | "queryKey"
  >
>;

interface InfiniteQueryResponse<T> {
  links: T[];
  nextCursor: string | null;
}
