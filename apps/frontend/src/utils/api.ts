import {
  MutationFunction,
  QueryFunction,
  QueryKey,
} from "@tanstack/react-query";
import { SortingState } from "@tanstack/react-table";

function createQueryString({ sorting, ...options }: IOptions): string {
  const params = new URLSearchParams();

  Object.entries({
    ...options,
    sorting: JSON.stringify(
      sorting?.map((sort) => ({
        sortBy: sort.id,
        sortDir: sort.desc ? "desc" : "asc",
      }))
    ),
  }).forEach(([key, value]) => params.append(key, `${value}`));

  return params.toString();
}

export type FetchListParams = Partial<{
  page: number;
  sorting: SortingState;
  searchTerm: string;
}>;

export const fetchList = async (
  path: string,
  username: string,
  params: FetchListParams
) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/${path}?${createQueryString(params)}`,
    {
      headers: {
        Authorization: `Bearer ${username}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export function getFetchInfiniteList<T>(
  path: string,
  username: string,
  filters?: Record<string, string>
) {
  const fetchFn: QueryFunction<IPage<T>, QueryKey, number> = async ({
    pageParam,
    signal,
  }) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/${path}?${createQueryString({
        page: pageParam ?? 1,
        limit: 10,
        ...filters,
      })}`,
      {
        headers: {
          Authorization: `Bearer ${username}`,
        },
        signal,
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();

    return result;
  };

  return fetchFn;
}

export function getMutationFn<TData, TVariables>(
  path: string,
  username: string,
  action: "create" | "update" | "delete" = "create"
) {
  const createFn: MutationFunction<TData, TVariables> = async (data) => {
    const method = {
      create: "POST",
      update: "PUT",
      delete: "DELETE",
    }[action];

    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/${path}${
        ["update", "delete"].includes(action)
          ? `/${(data as { id: string }).id}`
          : ""
      }`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${username}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  return createFn;
}
