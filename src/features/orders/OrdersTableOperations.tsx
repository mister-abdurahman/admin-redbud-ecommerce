import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function OrdersTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "TRUE", label: "Success" },
          { value: "FALSE", label: "Failed" },
        ]}
      />
      <SortBy
        options={[
          { value: "created_at-desc", label: "Sort by date (recent first)" },
          { value: "created_at-asc", label: "Sort by date (earlier first)" },
          {
            value: "total_amount-desc",
            label: "Sort by price (high first)",
          },
          { value: "total_amount-asc", label: "Sort by price (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default OrdersTableOperations;
