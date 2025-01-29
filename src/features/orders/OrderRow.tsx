import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { HiTrash, HiEye } from "react-icons/hi2";

import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal-v1";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

import { format } from "date-fns";
import { IOrder, IOrderRow } from "../../utils/types";
import Tag, { OrderItemsTag } from "../../ui/Tag";
import { formatCurrency } from "../../utils/helpers";

// v1
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Cabin = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked: any = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }

  @media only screen and (max-width: 500px) {
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
const HStacked: any = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
  flex-wrap: wrap;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }

  @media only screen and (max-width: 500px) {
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

const Amount: any = styled.div`
  font-family: "Sono";
  font-weight: 500;

  @media only screen and (max-width: 500px) {
    ${(props: any) =>
      props.type === "amount" &&
      css`
        display: none;
      `}
  }
`;

function OrderRow({ Order }: { Order: IOrderRow }) {
  // const { deleteOrder, isDeleting } = useDeleteOrder();
  const navigate = useNavigate();

  // order_id: number;
  // order_items: { product_name: string; quantity: number }[];
  // shipping_address: string;
  // status: boolean;
  // total_amount: number;
  // user_profile: { last_name: string; first_name: string };
  const {
    order_id,
    order_items,
    status,
    total_amount,
    user_profile,
    created_at,
  } = Order;

  console.log(Order);

  return (
    <Table.Row role="row">
      <Modal>
        <Cabin>{format(new Date(created_at), "MMM dd yyyy")}</Cabin>

        <Tag type={status ? "green" : "red"}>
          {status ? "Success" : "Failed"}
        </Tag>

        <Amount type="amount">{formatCurrency(total_amount)}</Amount>

        <Stacked>
          <span>
            {" "}
            {user_profile.last_name} {user_profile.first_name}
          </span>
        </Stacked>

        <HStacked>
          {order_items.map((el) => (
            <OrderItemsTag type={"blue"}>
              {el.quantity} {el.product_name}
            </OrderItemsTag>
          ))}
        </HStacked>

        <Menus.Menu>
          <Menus.Toggle id={order_id} />
          <Menus.List id={order_id}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/orders/${order_id}`)}
            >
              Open
            </Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default OrderRow;
