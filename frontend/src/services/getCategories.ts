import useSWR from 'swr';
import { GetCategoriesProps } from '../dtos';

export function getCategories(): GetCategoriesProps {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    `${process.env.apiUrl}/api/categories`,
    fetcher,
    { revalidateOnFocus: false }
  )

  return {
    categories: data,
    isLoadingCategories: !error && !data,
    isErrorCategories: error
  }
}