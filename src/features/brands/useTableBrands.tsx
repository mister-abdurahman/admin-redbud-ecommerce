import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getTableBrands } from "../../services/apiBrands";
import { RES_PER_PAGE } from "../../utils/constants";

export const useTableBrands = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const sortValue = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortValue.split("-");
  const sortBy = { field, direction };

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: brands, count } = {},
    error,
  } = useQuery({
    queryKey: ["brands", sortBy, currentPage],
    queryFn: () => getTableBrands({ sortBy, currentPage }),
  });

  const pageCount = Math.ceil(count! / RES_PER_PAGE);

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["brands", sortBy, currentPage - 1],
      queryFn: () => getTableBrands({ sortBy, currentPage: currentPage - 1 }),
    });
  }
  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["brands", sortBy, currentPage + 1],
      queryFn: () => getTableBrands({ sortBy, currentPage: currentPage + 1 }),
    });
  }

  return { brands, isLoading, error, count };
};
