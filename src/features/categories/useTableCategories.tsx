import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getTableCategories } from "../../services/apiCategories";
import { RES_PER_PAGE } from "../../utils/constants";

export const useTableCategories = () => {
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
    data: { data: categories, count } = {},
    error,
  } = useQuery({
    queryKey: ["categories", sortBy, currentPage],
    queryFn: () => getTableCategories({ sortBy, currentPage }),
  });

  const pageCount = Math.ceil(count! / RES_PER_PAGE);

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["categories", sortBy, currentPage - 1],
      queryFn: () =>
        getTableCategories({ sortBy, currentPage: currentPage - 1 }),
    });
  }
  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["categories", sortBy, currentPage + 1],
      queryFn: () =>
        getTableCategories({ sortBy, currentPage: currentPage + 1 }),
    });
  }

  return { categories, isLoading, error, count };
};
