import useSWR from 'swr';

import { GetRestaurantProps } from '../dtos';

export function getRestaurant(id: string[] | string): GetRestaurantProps {
  const fetcher = (...args) => fetch(args[0]).then((res) => res.json());

  const { data, error } = useSWR(
    `${process.env.apiUrl}/api/restaurants/${id}`,
    fetcher,
   { revalidateOnFocus: false }
 )

  return {
    restaurant: data,
    isLoading: !error && !data,
    isError: error
  }
}