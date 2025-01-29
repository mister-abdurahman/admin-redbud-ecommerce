import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Spinner from "../../ui/Spinner";
// import OrderDataBox from "./OrderDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal-v1";
import ConfirmDelete from "../../ui/ConfirmDelete";

// import { useOrder } from "features/Orders/useOrder";
// import { useDeleteOrder } from './useDeleteOrder';
import { useMoveBack } from "../../hooks/useMoveBack";
// import { useCheckout } from "../../features/check-in-out/useCheckout";
import ButtonText from "../../ui/ButtonText";
import Empty from "../../ui/Empty";
import useOrder from "./useOrder";
import { IOrderTableItem } from "../../utils/types";
import OrderDataBox from "./OrderDataBox";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function OrderDetail() {
  const { data, isLoading } = useOrder();

  const moveBack = () => {
    navigate(-1);
  };
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!data) return <Empty resourceName="Order" />;

  console.log("Order", data);

  const items = data?.orderItems
    ?.filter((el: IOrderTableItem) => el.order_id === data?.data.id)
    .map((item: any) => ({
      product_name: item.products?.name || "Unknown",
      quantity: item.quantity,
    }));

  const refined = {
    order_id: data.data.id,
    shipping_address: data.data.shipping_address,
    status: data.data.status,
    total_amount: data.data.total_amount,
    user_profile: data.data.user_profiles,
    order_items: items,
    created_at: data.data.created_at,
  };

  console.log(refined);

  const { order_id, status } = refined;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading type="h1">Order #{order_id}</Heading>
          <Tag type={status ? "green" : "red"}>
            {status ? "success" : "failed"}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <OrderDataBox Order={refined} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default OrderDetail;
