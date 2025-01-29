import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useSignup = () => {
  const { isPending, mutate: signup } = useMutation({
    mutationFn: ({
      email,
      password,
      fullName,
    }: {
      email: string;
      password: string;
      fullName: string;
    }) => signupApi({ email, password, fullName }),
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "User successfully created. Please verify your email address"
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, signup };
};

export default useSignup;
