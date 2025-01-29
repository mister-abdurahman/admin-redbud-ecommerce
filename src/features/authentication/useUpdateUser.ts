import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending: isUpdating, mutate: updateCurrentUser } = useMutation({
    mutationFn: ({
      password,
      fullName,
      avatar,
    }: {
      password?: string;
      fullName?: string;
      avatar?: string | null;
    }) => updateCurrentUserApi({ password, fullName, avatar }),
    onSuccess: () => {
      toast.success("User account successfully updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isUpdating, updateCurrentUser };
};

export default useUpdateCurrentUser;
