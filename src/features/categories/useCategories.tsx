import { useQuery } from "@tanstack/react-query";
import { getCategorys } from "../../services/apiCategories";

export const useCategories = () => {
  const {
    isLoading,
    data: categories,
    error,
  } = useQuery({
    queryFn: () => getCategorys(),
    queryKey: ["categories"],
  });

  return { categories, isLoading, error };
};
