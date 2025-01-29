import { useQuery } from "@tanstack/react-query";
import { getBrands } from "../../services/apiBrands";

export const useBrands = () => {
  const {
    isLoading,
    data: brands,
    error,
  } = useQuery({
    queryFn: () => getBrands(),
    queryKey: ["brands"],
  });

  // const brands = brandsX?.forEach((el) => {
  //   return { label: el.name, value: el.id };
  // });

  return { brands, isLoading, error };
};
