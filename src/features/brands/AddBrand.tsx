import Button from "../../ui/Button";
import Modal from "../../ui/Modal-v1";
import BrandForm from "./BrandForm";

function AddBrand() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="brand-form">
          <Button>Add new brand</Button>
        </Modal.Open>
        <Modal.Window name="brand-form">
          <BrandForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBrand;
