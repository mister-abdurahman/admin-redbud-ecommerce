import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditBrand } from "../../services/apiBrands";

const useCreateBrand = () => {
  const queryClient = useQueryClient();

  const {
    mutate: CreateBrand,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: ({ newBrand }: any) => {
      return createEditBrand(newBrand);
    },
    onSuccess: () => {
      toast.success("Brand successfully created");
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { CreateBrand, isCreating, error };
};

export default useCreateBrand;
