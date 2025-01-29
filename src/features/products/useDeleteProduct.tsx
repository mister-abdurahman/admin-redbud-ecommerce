import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct as deleteProductApi } from "../../services/apiProducts";
import toast from "react-hot-toast";

const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteProduct } = useMutation({
    mutationFn: (id: number) => deleteProductApi(id),
    onSuccess: () => {
      toast.success("Product successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteProduct, isDeleting };
};

export default useDeleteProduct;
