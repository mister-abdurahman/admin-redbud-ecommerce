import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory as deleteCategoryApi } from "../../services/apiCategories";
import toast from "react-hot-toast";

const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteCategory } = useMutation({
    mutationFn: (id: number) => deleteCategoryApi(id),
    onSuccess: () => {
      toast.success("Product successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteCategory, isDeleting };
};

export default useDeleteCategory;
