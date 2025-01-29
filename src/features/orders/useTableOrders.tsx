import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getTableOrders } from "../../services/apiOrders";
import { RES_PER_PAGE } from "../../utils/constants";

export const useTableOrders = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const sortValue = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortValue.split("-");
  const sortBy = { field, direction };
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { label: "status", value: filterValue };

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: Orders, count, orderItems } = {},
    error,
  } = useQuery({
    queryKey: ["orders", filter, sortBy, currentPage],
    queryFn: () => getTableOrders({ filter, sortBy, currentPage }),
  });

  const pageCount = Math.ceil(count! / RES_PER_PAGE);

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["orders", filter, sortBy, currentPage - 1],
      queryFn: () =>
        getTableOrders({ filter, sortBy, currentPage: currentPage - 1 }),
    });
  }
  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["orders", filter, sortBy, currentPage + 1],
      queryFn: () =>
        getTableOrders({ sortBy, filter, currentPage: currentPage + 1 }),
    });
  }

  return { Orders, isLoading, error, count, orderItems };
};
