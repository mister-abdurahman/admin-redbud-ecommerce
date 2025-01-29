import AddProduct from "../features/products/AddProduct";
import ProductsTableOperations from "../features/products/ProductsTableOperations";
import ProductTable from "../features/products/ProductTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Products() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Products</Heading>
        <ProductsTableOperations />
      </Row>

      <Row>
        <ProductTable />
        <AddProduct />
      </Row>
    </>
  );
}

export default Products;
