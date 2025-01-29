import styled, { css } from "styled-components";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
// import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";
import ErrorFallback from "../../ui/ErrorFallback";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "../../ui/Pagination";
import { useEffect, useRef, useState } from "react";
import { IOrder, IOrderRow, IProduct, IProductRow } from "../../utils/types";
import SearchInput from "../../ui/SearchInput";
import { HStack } from "../../styles/styles";
import { table } from "console";
import OrderRow from "./OrderRow";
import { useTableOrders } from "./useTableOrders";

const TableHeaderDiv: any = styled.div`
  @media only screen and (max-width: 500px) {
    ${(props: any) =>
      props.type === "amount" &&
      css`
        display: none;
      `}
    ${(props: any) =>
      props.type === "brand" &&
      css`
        display: none;
      `}
    ${(props: any) =>
      props.type === "Order" &&
      css`
        display: none;
      `}
  }
`;

function OrderTable() {
  const {
    Orders,
    orderItems,
    isLoading: loadingOrders,
    error: OrdersError,
    count,
  } = useTableOrders();

  const [searchText, setSearchText] = useState("");

  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get("status");

  if (loadingOrders) return <Spinner />;

  if (OrdersError) return <ErrorFallback errorMsg={OrdersError} />;

  const result = Orders?.map((order) => {
    // Filter order items matching the current order id
    const orderItemsFiltered = orderItems
      ?.filter((item) => item.order_id === order.id)
      .map((item) => ({
        product_name: item.products?.name || "Unknown", // Safely access product name
        quantity: item.quantity,
      }));

    return {
      order_id: order.id,
      shipping_address: order.shipping_address,
      status: order.status,
      total_amount: order.total_amount,
      user_profile: order.user_profiles,
      order_items: orderItemsFiltered,
      created_at: order.created_at,
    };
  });

  let filteredOrders;
  switch (filterParam) {
    case "all":
      filteredOrders = result;
      break;
    case "success":
      filteredOrders = result?.filter((el) => el.status);
      break;
    case "failed":
      filteredOrders = result?.filter((el) => !el.status);
      break;
    default:
      filteredOrders = result;
      break;
  }

  return (
    <Menus>
      <HStack>
        <SearchInput
          placeholderText="Search Order"
          text={searchText}
          setText={setSearchText}
        />
      </HStack>
      <Table columns="1.2fr 1.2fr 1.8fr 1.6fr 3fr 1fr">
        <Table.Header>
          <TableHeaderDiv>Date</TableHeaderDiv>
          <TableHeaderDiv>Status</TableHeaderDiv>
          <TableHeaderDiv>Amount</TableHeaderDiv>
          <TableHeaderDiv>Customer</TableHeaderDiv>
          <TableHeaderDiv>Order Items</TableHeaderDiv>
          <TableHeaderDiv></TableHeaderDiv>
        </Table.Header>

        <Table.Body
          data={filteredOrders}
          render={(Order: IOrderRow) => (
            <OrderRow key={Order?.order_id} Order={Order} />
          )}
        />

        <Table.Footer>
          <Pagination count={count || 10} />{" "}
        </Table.Footer>
      </Table>
    </Menus>
  );
}

// We could create yet another layer of abstraction on top of this. We could call this component just <Results>, like: Results({data, count, isLoading, columns, rowComponent}). Then <OrderTable> and ALL other tables would simply call that.
// BUT, creating more abstractions also has a cost! More things to remember, more complex codebase to understand. Sometimes it's okay to just copy and paste instead of creating abstractions

export default OrderTable;
