import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../api/apiClient";
import Loader from "../components/Loader";
import { ProductCards } from "./Query";
import { PaginatedProducts } from "../types/Products";
import { getRandomColor } from "../utils/colors";
import { useRef } from "react";

const InfiniteQueries = () => {
  const scrollRef = useRef(null);

  const handleLoadProducts = async ({ pageParam }: { pageParam?: number }) => {
    try {
      const res = await api.get<PaginatedProducts>(
        `/products?limit=10&skip=${pageParam}`
      );

      if (res.status === 200) {
        return res.data;
      }

      throw new Error("Failed to fetch products");
    } catch (error) {
      throw error;
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetching, isError, error } =
    useInfiniteQuery({
      queryKey: ["paginatedProducts"],
      queryFn: handleLoadProducts,
      initialPageParam: 0,
      getNextPageParam: (lastPage, _) => {
        const cursor = lastPage.skip + 10;
        if (lastPage.total / cursor <= 1) {
          return undefined;
        }

        return cursor;
      },
    });

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Load More Products</h1>
      <div ref={scrollRef} className="w-full flex-1 overflow-auto">
        {isFetching ? (
          <Loader />
        ) : isError ? (
          <div className="">Error: {error.message}</div>
        ) : (
          <div className="flex flex-col gap-2">
            {data?.pages.map((page) =>
              page.products.map((product, index) => (
                <ProductCards key={index} product={product} />
              ))
            )}
          </div>
        )}
      </div>
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage}
        className="p-1 disabled:opacity-80 rounded-lg border-2 border-black text-black"
        style={{
          backgroundColor: getRandomColor(),
        }}
      >
        Load More
      </button>
    </div>
  );
};

export default InfiniteQueries;
