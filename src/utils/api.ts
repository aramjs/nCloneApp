import {
  MutationFunction,
  QueryFunction,
  QueryKey,
} from "@tanstack/react-query";

function createQueryString(options: IOptions): string {
  const params = new URLSearchParams();

  Object.entries(options || {}).forEach(([key, value]) =>
    params.append(key, `${value}`)
  );

  return params.toString();
}

export function getFetchList<T>(
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

export function getCreateFn<TData, TVariables>(path: string, username: string) {
  const createFn: MutationFunction<TData, TVariables> = async (data) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/${path}`,
      {
        method: "POST",
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
