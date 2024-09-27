import {
  AnyRouter,
  useLocation,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { useCallback } from "react";

type IQueryParams = Record<string, string | number | boolean | unknown[]>;

export const useUrlSearchParams = <T extends IQueryParams>() => {
  const location = useLocation();
  const searchParams = useSearch({ from: location.pathname });
  const navigate = useNavigate<AnyRouter, string>({ from: location.pathname });

  const setQueryParams = useCallback(
    (data: IQueryParams) => {
      // @ts-expect-error ts-error
      return navigate({ search: (prev) => ({ ...prev, ...data }) });
    },
    [navigate]
  );

  return [searchParams, setQueryParams] as [
    searchParams: T,
    setQueryParams: typeof setQueryParams
  ];
};
