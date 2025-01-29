import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";
import { getProfileById } from "../../services/apiProfile";

export const useProfileById = (id: number) => {
  const {
    isLoading,
    data: profile,
    error,
  } = useQuery({
    queryFn: () => getProfileById(id),
    queryKey: ["profile", `profile-${id}`],
  });

  return { profile, isLoading, error };
};
