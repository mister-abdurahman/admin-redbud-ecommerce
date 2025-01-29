import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTableProducts } from "../../services/apiProducts";
import { useSearchParams } from "react-router-dom";
import { RES_PER_PAGE } from "../../utils/constants";

export const useTableProducts = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const sortValue = searchParams.get("sortBy") || "created_at-desc";
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { label: "status", value: filterValue };
  const [field, direction] = sortValue.split("-");
  const sortBy = { field, direction };
  // { label: "totalPrice", value: 3000, method: "gte" };

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: tableProducts, count } = {},
    error,
  } = useQuery({
    queryKey: ["products", filter, sortBy, currentPage],
    queryFn: () => getTableProducts({ filter, sortBy, currentPage }),
  });

  const pageCount = Math.ceil(count! / RES_PER_PAGE);

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["products", filter, sortBy, currentPage - 1],
      queryFn: () =>
        getTableProducts({ filter, sortBy, currentPage: currentPage - 1 }),
    });
  }
  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["products", filter, sortBy, currentPage + 1],
      queryFn: () =>
        getTableProducts({ filter, sortBy, currentPage: currentPage + 1 }),
    });
  }

  return { tableProducts, isLoading, error, count };
};
