export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Cart {
  products: CartProduct[];
}

export interface FetchCartsRes {
  carts: Cart[];
}
