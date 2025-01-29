import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function CategoriesTableOperations() {
  return (
    <TableOperations>
      <SortBy
        options={[
          { value: "created_at-desc", label: "Sort by date (recent first)" },
          { value: "created_at-asc", label: "Sort by date (earlier first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CategoriesTableOperations;
