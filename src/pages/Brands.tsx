import AddBrand from "../features/brands/AddBrand";
import BrandsTableOperations from "../features/brands/BrandsTableOperations";
import BrandTable from "../features/brands/BrandTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Brands() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Brands</Heading>
        <BrandsTableOperations />
      </Row>

      <Row>
        <BrandTable />
        <AddBrand />
      </Row>
    </>
  );
}

export default Brands;
