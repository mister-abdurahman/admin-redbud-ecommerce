import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCategory } from "../../services/apiCategories";

const useEditCategory = () => {
  const queryClient = useQueryClient();

  const {
    mutate: EditCategory,
    isPending: isEditing,
    error,
  } = useMutation({
    mutationFn: ({ newCategory, id }: any) => {
      return createEditCategory(newCategory, id);
    },
    onSuccess: () => {
      toast.success("Category successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { EditCategory, isEditing, error };
};

export default useEditCategory;
