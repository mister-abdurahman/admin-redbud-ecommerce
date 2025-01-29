import Button from "../../ui/Button";
import Modal from "../../ui/Modal-v1";
import CategoryForm from "./CategoryForm";

function AddCategory() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="category-form">
          <Button>Add new Category</Button>
        </Modal.Open>
        <Modal.Window name="category-form">
          <CategoryForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCategory;
