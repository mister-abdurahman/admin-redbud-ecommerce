import OrdersTableOperations from "../features/orders/OrdersTableOperations";
import OrderTable from "../features/orders/OrderTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Orders() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Orders</Heading>
        <OrdersTableOperations />
      </Row>

      <Row>
        <OrderTable />
      </Row>
    </>
  );
}

export default Orders;
