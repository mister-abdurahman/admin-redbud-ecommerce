import { useQuery } from "@tanstack/react-query";
import { getOrders, getOrdersByDate } from "../../services/apiOrders";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { MINIMUM_FILTER_DAYS } from "../../utils/constants";

export const useOrders = () => {
  const {
    isLoading,
    data: orders,
    error,
  } = useQuery({
    queryFn: () => getOrders(),
    queryKey: ["orders"],
  });

  return { orders, isLoading, error };
};

export const useRecentOrders = () => {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? MINIMUM_FILTER_DAYS
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();
  const {
    isLoading,
    data: orders,
    error,
  } = useQuery({
    queryFn: () => getOrdersByDate(queryDate),
    queryKey: ["orders", `last-${numDays}`],
  });

  return { orders, isLoading, error };
};
