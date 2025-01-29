import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../../services/apiOrders";
import { useParams } from "react-router-dom";

const useOrder = () => {
  const { orderId } = useParams();

  const { isLoading, data, error } = useQuery<any>({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId ?? "0"),
    retry: false,
  });

  return { isLoading, data, error };
};

export default useOrder;
