import useSWR from 'swr';

import { GetAvailableCitiesProps } from '../dtos';

export function getAvailableCities(): GetAvailableCitiesProps {
  const fetcher = (...args) => fetch(args[0]).then((res) => res.json());

  const { data, error } = useSWR(
    `${process.env.apiUrl}/api/available_cities`,
    fetcher,
    { revalidateOnFocus: false }
  )

  return {
    cities: data,
    isError: error,
    isLoading: !error && !data
  }
}