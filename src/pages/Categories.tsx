import AddCategory from "../features/categories/AddCategory";
import CategoriesTableOperations from "../features/categories/CategoriesTableOperations";
import CategoryTable from "../features/categories/CategoryTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Categories() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Categories</Heading>
        <CategoriesTableOperations />
      </Row>

      <Row>
        <CategoryTable />
        <AddCategory />
      </Row>
    </>
  );
}

export default Categories;
