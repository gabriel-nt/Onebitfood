import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import { GetRestaurantsProps, AddressProps } from '../dtos';
import addressState from '../store/atoms/addressAtom';

export function getRestaurants(): GetRestaurantsProps {
  let params = '';
  const router = useRouter();
  const { category, q } = router.query;

  const [address] = useRecoilState<AddressProps>(addressState);

  if(q)
    params = `${params == '' ? '?' : '&'}q=${q}`;

  if(category)
    params = `${params == '' ? '?' : `${params}&`}category=${category}`;

  console.log(params);

  if(address.city)
    params = `${params == '' ? '?' : `${params}&`}city=${address.city}`;

  const fetcher = (...args) => fetch(args[0]).then((res) => res.json());
  
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