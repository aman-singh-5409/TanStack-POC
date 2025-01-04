import { useState } from "react";
import { api } from "../api/apiClient";
import { PaginatedProducts } from "../types/Products";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { ProductCards } from "./Query";
import { ChevronsLeft } from "lucide-react";
import { ChevronsRight } from "lucide-react";
import { getRandomColor } from "../utils/colors";

const PaginatedQueries = () => {
  const pageSize = 10;
  const [total, seTotal] = useState(0);
  const [page, setPage] = useState(pageSize);

  const handlePrev = () => {
    setPage((page) => page - pageSize);
  };

  const handleNext = () => {
    if (!isPlaceholderData) {
      setPage((page) => page + pageSize);
    }
  };

  const getProductsByPage = async (page: number = 0) => {
    try {
      const res = await api.get<PaginatedProducts>(
        `/products?limit=${pageSize}&skip=${page - pageSize}`
      );

      if (res.status === 200) {
        seTotal(res.data.total);
        return res.data.products;
      }

      throw new Error("Failed to fetch products!");
    } catch (error) {
      throw error;
    }
  };

  const { data, isPending, isFetching, isError, error, isPlaceholderData } =
    useQuery({
      queryKey: ["products", page],
      queryFn: () => getProductsByPage(page),
      placeholderData: keepPreviousData,
    });

    console.log(total);

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Products with pagination</h1>
      <div className="w-full flex-1 overflow-auto">
        {isPending ? (
          <Loader />
        ) : isError ? (
          <div className="">Error: {error.message}</div>
        ) : (
          <div className="flex flex-col gap-2">
            {data.map((product) => (
              <ProductCards product={product} />
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-10">
        <button
          className="p-1 border-2 rounded-xl text-black border-black disabled:opacity-60"
          style={{ backgroundColor: getRandomColor() }}
          disabled={page === 10}
          onClick={handlePrev}
        >
          <ChevronsLeft />
        </button>
        <div className="text-xl font-bold">{page / pageSize}/{Math.ceil(total/pageSize)}</div>
        <button
          className="p-1 border-2 rounded-xl text-black border-black disabled:opacity-60"
          style={{ backgroundColor: getRandomColor() }}
          disabled={isPlaceholderData || page >= total}
          onClick={handleNext}
        >
          <ChevronsRight />
        </button>
      </div>
      {isFetching && (
        <div className="">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default PaginatedQueries;
