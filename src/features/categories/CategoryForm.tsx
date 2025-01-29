import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { Textarea } from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { ICategory } from "../../utils/types";
import useEditCategory from "./useEditCategory";
import useCreateCategory from "./useCreateCategory";

function CategoryForm({ categoryToEdit = {}, closeModal, onCloseModal }: any) {
  const { id: editId, ...editValues } = categoryToEdit;
  const isEditSession = Boolean(editValues);
  const { register, handleSubmit, reset, formState }: any = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { CreateCategory, isCreating } = useCreateCategory();
  const { EditCategory, isEditing } = useEditCategory();

  const isWorking = isCreating || isEditing;

  function handleForm(data: ICategory) {
    if (editId)
      EditCategory(
        {
          newCategory: data,
          id: editId,
        },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      CreateCategory(
        { newCategory: { name: data.name, description: data.description } },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function handleErrors(errors: never) {
    console.log(errors);
  }

  return (
    // <Form onSubmit={handleSubmit(onSubmit, onError)} type='modal'>
    <Form
      onSubmit={handleSubmit(handleForm, handleErrors)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Category name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="text"
          id="description"
          disabled={isWorking}
          {...register("description", { required: false })}
        />
      </FormRow>

      <FormRow label="Created At" error={errors?.created_at?.message}>
        <Textarea
          type="text"
          id="created_at"
          disabled={true}
          {...register("created_at", { required: false })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isWorking}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {editId ? "Edit Category" : "Create new category"}
        </Button>
      </FormRow>
    </Form>
  );
}

// export default EditForm;
export default CategoryForm;
