import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditProduct } from "../../services/apiProducts";
import toast from "react-hot-toast";

const useEditProduct = () => {
  const queryClient = useQueryClient();

  const {
    mutate: EditProduct,
    isPending: isEditing,
    error,
  } = useMutation({
    mutationFn: ({ newProduct, id }: any) => {
      return createEditProduct(newProduct, id);
    },
    onSuccess: () => {
      toast.success("Product successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { EditProduct, isEditing, error };
};

export default useEditProduct;
