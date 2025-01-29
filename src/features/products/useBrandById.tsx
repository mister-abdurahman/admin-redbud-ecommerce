import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getBrandById } from "../../services/apiBrands";
import toast from "react-hot-toast";

const useBrandById = () => {
  const queryClient = useQueryClient();

  const {
    mutate: GetBrand,
    isPending: isLoadingBrand,
    error,
  } = useMutation({
    mutationFn: ({ id }: any) => {
      return getBrandById(id);
    },
    onSuccess: () => {
      toast.success("Product successfully updated");
      queryClient.invalidateQueries({
        queryKey: [`brands`],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { GetBrand, isLoadingBrand, error };
};

export default useBrandById;
