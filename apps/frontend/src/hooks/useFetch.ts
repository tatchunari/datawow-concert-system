"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

type FetcherFn<T> = () => Promise<T>;

/**
 * Generic hook to fetch any data using React Query + Axios
 * @param queryKey unique query key (can be string or array)
 * @param fetcher async function that returns data
 * @param options optional React Query options
 */
export function useFetch<T>(
  queryKey: readonly unknown[] | string,
  fetcher: FetcherFn<T>,
  options?: Omit<
    UseQueryOptions<T, AxiosError, T, readonly unknown[]>,
    "queryKey" | "queryFn"
  >
) {
  const key = Array.isArray(queryKey) ? queryKey : [queryKey];
  return useQuery<T, AxiosError>({
    queryKey: key,
    queryFn: fetcher,
    ...options,
  });
}
