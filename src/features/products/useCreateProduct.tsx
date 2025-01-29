import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditProduct } from "../../services/apiProducts";
import toast from "react-hot-toast";

const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const {
    mutate: CreateProduct,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: ({ newProduct }: any) => {
      console.log("in query fn area", newProduct);
      return createEditProduct(newProduct);
    },
    onSuccess: () => {
      toast.success("Product successfully created");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { CreateProduct, isCreating, error };
};

export default useCreateProduct;
