import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditBrand } from "../../services/apiBrands";

const useEditBrand = () => {
  const queryClient = useQueryClient();

  const {
    mutate: EditBrand,
    isPending: isEditing,
    error,
  } = useMutation({
    mutationFn: ({ newBrand, id }: any) => {
      return createEditBrand(newBrand, id);
    },
    onSuccess: () => {
      toast.success("Brand successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { EditBrand, isEditing, error };
};

export default useEditBrand;
