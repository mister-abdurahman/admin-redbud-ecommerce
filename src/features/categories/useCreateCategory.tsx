import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCategory } from "../../services/apiCategories";
import toast from "react-hot-toast";

const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const {
    mutate: CreateCategory,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: ({ newCategory }: any) => {
      return createEditCategory(newCategory);
    },
    onSuccess: () => {
      toast.success("Category successfully created");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { CreateCategory, isCreating, error };
};

export default useCreateCategory;
