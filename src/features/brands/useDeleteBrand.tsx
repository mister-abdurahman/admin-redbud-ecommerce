import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBrand as deleteBrandApi } from "../../services/apiBrands";
import toast from "react-hot-toast";

const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteBrand } = useMutation({
    mutationFn: (id: number) => deleteBrandApi(id),
    onSuccess: () => {
      toast.success("Brand successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteBrand, isDeleting };
};

export default useDeleteBrand;
