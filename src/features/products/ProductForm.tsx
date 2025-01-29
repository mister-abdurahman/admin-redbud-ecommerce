// import { useCreateProduct } from "features/cabins/useCreateProduct";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import useCreateProduct from "./useCreateProduct";
import useEditProduct from "./useEditProduct";
import { IProductForm } from "../../utils/types";
import Radio from "../../ui/Radio";
import Select from "../../ui/Select";

// We use react-hook-form to make working with complex and REAL-WORLD forms a lot easier. It handles stuff like user validation and errors. manages the form state for us, etc
// Validating the user’s data passed through the form is a crucial responsibility for a developer.
// React Hook Form takes a slightly different approach than other form libraries in the React ecosystem by adopting the use of uncontrolled inputs using ref instead of depending on the state to control the inputs. This approach makes the forms more performant and reduces the number of re-renders.

// Receives closeModal directly from Modal
function ProductForm({
  productToEdit = {},
  closeModal,
  onCloseModal,
  brands,
  categories,
}: any) {
  const { id: editId, ...editValues } = productToEdit;
  const isEditSession = Boolean(editValues);
  const { register, handleSubmit, getValues, reset, formState, setValue }: any =
    useForm({
      defaultValues: isEditSession
        ? { ...editValues, status: true ? "available" : "out-of-stock" }
        : {},
    });
  const { errors } = formState;

  const { CreateProduct, isCreating, error: createError } = useCreateProduct();
  const { EditProduct, isEditing, error: editError } = useEditProduct();

  const isWorking = isCreating || isEditing;

  console.log(editValues);

  function handleForm(data: IProductForm) {
    const img_url =
      typeof data?.img_url === "string" ? data?.img_url : data?.img_url[0];
    const status = data?.status === "available" ? true : false;

    const refined = {
      name: data.name,
      price: data.price,
      status: status,
      img_url: img_url,
      brand_id: data.brand_id,
      category_id: data.category_id,
      description: data.description,
      reviews: null,
    };

    if (editId)
      EditProduct(
        {
          newProduct: refined,
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
      CreateProduct(
        { newProduct: refined },
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
      <FormRow label="Product name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Price" error={errors?.price?.message}>
        <Input
          type="number"
          id="Price"
          disabled={isWorking}
          {...register("price", {
            required: "This field is required",
            min: {
              value: 0,
              message: "Add a price to Product",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.status?.message}>
        <h3 style={{ fontWeight: "400", fontSize: "14px" }}>Status</h3>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="available"
            {...register("status")}
            value="available"
          />
          <label htmlFor="available">Available</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="out-of-stock"
            {...register("status")}
            value="out-of-stock"
          />
          <label htmlFor="out-of-stock">Out of stock</label>
        </div>
        {/* <label htmlFor="available">
          <input type="radio" name="" id="" />
          <input type="radio" name="" id="" />
          <Radio
            id="available"
            name="group"
            value={"available"}
            {...register("status")}
            checked={getValues().status}
          />
          Available
        </label>
        <label htmlFor="out-of-stock">
          <Radio
            id="out-of-stock"
            name="group"
            value={"out-of-stock"}
            {...register("status")}
            checked={getValues().status}
          />
          Out of Stock
        </label> */}
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="text"
          id="description"
          disabled={isWorking}
          {...register("description", { required: false })}
        />
      </FormRow>

      <FormRow label="Product Image" error={errors?.img_url?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("img_url", {
            required: editId ? false : "This field is required",
          })}
        />
      </FormRow>

      {/* options is an array of value and label */}
      <FormRow label="Brand" error={errors?.brand_id?.message}>
        <select
          name="brand_id"
          id=""
          {...register("brand_id", { required: "This field is required" })}
          disabled={isWorking}
        >
          <option value="">- Select Brand -</option>
          {brands.map((el: { label: string; value: string }) => (
            <option value={+el.value}>{el.label}</option>
          ))}
        </select>
        {/* <Select
          id={"brand"}
          disabled={isWorking}
          options={brands}
          // value={editValues.brand_id}
          {...register("brand_id", { required: "This field is required" })}
        /> */}
      </FormRow>

      <FormRow label="Category" error={errors?.category_id?.message}>
        <select
          name="category_id"
          id=""
          {...register("category_id", { required: "This field is required" })}
          disabled={isWorking}
        >
          <option value="">- Select Category -</option>
          {categories.map((el: { label: string; value: string }) => (
            <option value={+el.value}>{el.label}</option>
          ))}
        </select>
        {/* <Select
          id={"category"}
          disabled={isWorking}
          options={categories}
          // value={editValues.category_id}
          {...register("category_id", { required: "This field is required" })}
        /> */}
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
          {/* {isEditSession ? "Edit cabin" : "Create new cabin"} */}
          {editId ? "Edit product" : "Create new product"}
        </Button>
      </FormRow>
    </Form>
  );
}

// export default EditForm;
export default ProductForm;
