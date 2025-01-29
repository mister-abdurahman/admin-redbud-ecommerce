import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function ProductsTableOperations() {
  return (
    <TableOperations>
      {/* We could do these two as compound components as well, but let's keep it simple, and let's also explore different ways of achieving the same thing */}
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "TRUE", label: "Available" },
          { value: "FALSE", label: "Out of stock" },
        ]}
      />

      <SortBy
        options={[
          { value: "created_at-desc", label: "Sort by date (recent first)" },
          { value: "created_at-asc", label: "Sort by date (earlier first)" },
          {
            value: "price-desc",
            label: "Sort by price (high first)",
          },
          { value: "price-asc", label: "Sort by price (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default ProductsTableOperations;
