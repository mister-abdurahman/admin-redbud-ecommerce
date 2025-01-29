import React from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import useSignup from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

export const SignupForm = () => {
  const { register, handleSubmit, getValues, reset, formState }: any =
    useForm();
  const { errors } = formState;

  const { signup, isPending } = useSignup();

  function submitFn({
    email,
    password,
    fullName,
  }: {
    email: string;
    password: string;
    fullName: string;
  }) {
    console.log({ email, password, fullName });

    signup(
      { email, password, fullName },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(submitFn)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isPending}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isPending}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isPending}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 character length",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.confirmPassword?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isPending}
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (value: string) =>
              value === getValues().password || "Password needs to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isPending}
          variation="secondary"
          type="reset"
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isPending}>Create new user</Button>
      </FormRow>
    </Form>
  );
};
