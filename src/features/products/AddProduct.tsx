import Button from "../../ui/Button";
import ErrorFallback from "../../ui/ErrorFallback";
import Modal from "../../ui/Modal-v1";
import Spinner from "../../ui/Spinner";
import { useBrands } from "../brands/useBrands";
import { useCategories } from "../categories/useCategories";
import ProductForm from "./ProductForm";

function AddProduct() {
  const {
    brands,
    isLoading: isLoadingBrands,
    error: brandsError,
  } = useBrands();
  const {
    categories,
    isLoading: loadingCategories,
    error: categoriesError,
  } = useCategories();

  if (isLoadingBrands || loadingCategories) return <Spinner />;
  if (categoriesError) return <ErrorFallback errorMsg={brandsError} />;
  if (categoriesError) return <ErrorFallback errorMsg={categoriesError} />;

  const brandOpts = brands?.map((el) => {
    return { label: el.name, value: el.id };
  });

  const categoriesOpts = categories?.map((el) => {
    return { label: el.name, value: el.id };
  });

  return (
    <div>
      <Modal>
        <Modal.Open opens="product-form">
          <Button>Add new Product</Button>
        </Modal.Open>
        <Modal.Window name="product-form">
          <ProductForm brands={brandOpts} categories={categoriesOpts} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// const AddProduct = () => {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((prev) => !prev)}>
//         + Add new cabin
//       </Button>

//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// };

export default AddProduct;
