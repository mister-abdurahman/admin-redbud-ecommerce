import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  getProductsWithBrandName,
} from "../../services/apiProducts";

export const useProducts = () => {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryFn: () => getProducts(),
    queryKey: ["products"],
  });

  return { products, isLoading, error };
};

export const useProductsWithBrandName = () => {
  const {
    isLoading,
    data: productsWithBrandName,
    error,
  } = useQuery({
    queryFn: () => getProductsWithBrandName(),
    queryKey: ["productsWithBrandName"],
  });

  return { productsWithBrandName, isLoading, error };
};
