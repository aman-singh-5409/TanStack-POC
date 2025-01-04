import { useMutation, useQuery } from "@tanstack/react-query";
import { FetchProductRes, Product } from "../types/Products";
import { api } from "../api/apiClient";
import Loader from "../components/Loader";
import { ProductCards } from "./Query";
import { useState } from "react";

const Mutations = () => {
  const [productToAdd, setProductToAdd] = useState<number | null>(null);
  const [cart, setCart] = useState<number[]>([]);
  const [cartValue, setCartValue] = useState<number>(0);
  const fetchProducts = async () => {
    try {
      const res = await api.get<FetchProductRes>("/products");

      if (res.status === 200) {
        return res.data.products;
      }

      throw new Error("Failed to fetch products!");
    } catch (error) {
      throw error;
    }
  };

  const addToCart = (product: { id: number; quantity: number }) => {
    return api.post(`/carts/add`, {
      userId: 6,
      products: [product],
    });
  };

  const { data, isFetching, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const addToCartMutation = useMutation({
    onMutate: (variables) => {
      setProductToAdd(variables.id);
    },
    onSuccess: (data) => {
      setProductToAdd(null);
      console.log({ data });
      if (data.status === 201) {
        let newValue = 0;
        data.data.products.forEach((p: Product) => {
          newValue += p.price;
        });
        setCartValue((value) => value + newValue);
        setCart((cart) => [
          ...cart,
          ...data.data.products.map((product: Product) => product.id),
        ]);
      }
    },
    onSettled: () => {
      setProductToAdd(null);
    },
    mutationFn: addToCart,
  });

  console.log({ cart });

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mutations</h1>
        <div className="py-1 px-2 rounded-lg bg-[#444]">
          Cart Value: {Math.round(cartValue).toFixed(2)}
        </div>
      </div>
      <div className="w-full flex-1 overflow-auto">
        {isFetching || isPending ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-2">
            {data?.map((product, index) => (
              <ProductCards
                key={index}
                product={product}
                showAddToCard={true}
                cart={cart}
                loading={
                  addToCartMutation.isPending && productToAdd === product.id
                }
                addToCartAction={() =>
                  addToCartMutation.mutate({
                    id: product.id,
                    quantity: Math.random() * 10,
                  })
                }
              />
            ))}
          </div>
        )}
      </div>
      {addToCartMutation.isError && (
        <div className="text-red-800 bg-red-400 p-1 rounded-xl">
          {addToCartMutation.error.message}
        </div>
      )}
    </div>
  );
};

export default Mutations;
