export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
}

export interface FetchProductRes {
  products: Product[];
}

export interface PaginatedProducts {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface AddToCartResponse {
  
}