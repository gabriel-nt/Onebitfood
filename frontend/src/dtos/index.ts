export interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export interface ProductCategoriesProps {
  id: number;
  title: string;
  products: ProductProps[]
}

export interface RestaurantProps {
  id: number;
  name: string;
  description: string;
  category_title: string;
  delivery_tax: number;
  image_url: string;
  product_categories: ProductCategoriesProps[];
}

export interface CategoryProps {
  title: string;
  image_url: string;
}

export interface GetRestaurantsProps {
  restaurants: RestaurantProps[];
  isLoading: boolean;
  isError: string
}

export interface GetRestaurantProps {
  restaurant: RestaurantProps;
  isLoading: boolean;
  isError: string
}

export interface GetCategoriesProps {
  categories: CategoryProps[];
  isErrorCategories: string;
  isLoadingCategories: boolean;
}