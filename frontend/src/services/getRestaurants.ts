import useSWR from 'swr';
import { useRouter } from 'next/router';

import { GetRestaurantsProps } from '../dtos';

export function getRestaurants(): GetRestaurantsProps {
  let params = '';
  const router = useRouter();
  const { category, q } = router.query;

  if(q)
    params = `${params == '' ? '?' : '&'}q=${q}`

  if(category)
    params = `${params == '' ? '?' : '&'}category=${category}`

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    `${process.env.apiUrl}/api/restaurants${params}`,
    fetcher,
   { revalidateOnFocus: false }
 )

  return {
    restaurants: data,
    isLoading: !error && !data,
    isError: error
  }
}