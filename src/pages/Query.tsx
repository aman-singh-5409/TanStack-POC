import { useQuery } from "@tanstack/react-query";
import { api } from "../api/apiClient";
import { FetchProductRes, Product } from "../types/Products";
import Loader from "../components/Loader";
import { getRandomColor } from "../utils/colors";
import { ShoppingCart, CircleCheckBig } from "lucide-react";

const Query = () => {
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

  const { data, isFetching, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 10000,
  });

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Products</h1>
      <div className="w-full flex-1 overflow-auto">
        {isFetching || isPending ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-2">
            {data?.map((product) => (
              <ProductCards product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Query;

export const ProductCards = ({
  product,
  showAddToCard,
  addToCartAction,
  loading,
  cart,
}: {
  product: Product;
  showAddToCard?: boolean;
  addToCartAction?: () => void;
  loading?: boolean;
  cart?: number[];
}) => {
  return (
    <div className="bg-[#222] p-5 flex flex-col gap-2 rounded-xl">
      <h1 className="font-semibold text-xl">
        {product.id}.{product.title}
      </h1>
      <p className="font-thin text-sm">{product.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div
            className="border-2 border-black p-2 rounded-xl font-bold text-black"
            style={{ backgroundColor: getRandomColor() }}
          >
            Rating: {product.rating}
          </div>
          <div
            className="border-2 border-black p-2 rounded-xl font-bold text-black"
            style={{ backgroundColor: getRandomColor() }}
          >
            Price: {product.price}
          </div>
          <div
            className="border-2 border-black p-2 rounded-xl font-bold text-black"
            style={{ backgroundColor: getRandomColor() }}
          >
            Category: {product.category}
          </div>
        </div>

        {showAddToCard && (
          <button
            onClick={addToCartAction}
            className="border-2 border-black p-2 rounded-xl font-bold text-black flex items-center justify-center gap-2"
            style={{ backgroundColor: getRandomColor() }}
          >
            {loading ? (
              <Loader />
            ) : cart?.find((id) => id === product.id) ? (
              <CircleCheckBig />
            ) : (
              <>
                <ShoppingCart />
                Add To Cart
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
