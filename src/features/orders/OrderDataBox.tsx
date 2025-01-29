import styled from "styled-components";
import { format } from "date-fns";

import { box } from "../../styles/styles";
import { formatDistanceFromNow } from "../../utils/helpers";
import { isToday } from "date-fns";
// import { isToday } from "date-fns/esm";
import { formatCurrency } from "../../utils/helpers";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";
import { TbTruckDelivery } from "react-icons/tb";
import { FaUserCheck, FaMoneyBill } from "react-icons/fa";
import Tag from "../../ui/Tag";

const StyledOrderDataBox = styled.section`
  ${box} /* padding: 3.2rem 4rem; */
  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  /* padding: 2.4rem 4rem; */
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 500px) {
    flex-wrap: wrap;
    font-size: 1.2rem;
    padding: 1.4rem 2.2rem;
    justify-content: center;
  }

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  /* font-size: 1.8rem; */
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  @media only screen and (max-width: 500px) {
    flex-direction: column;
    gap: 0.5rem;
    font-size: 1.4rem;
  }

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price: any = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 0.4rem;
  font-size: 1.4rem;

  @media only screen and (max-width: 500px) {
    flex-wrap: wrap;
    justify-content: center;
  }

  background-color: ${(props: any) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props: any) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;
const HStack = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.6rem;
`;
const ItemsBox = styled.div`
  border: 2px solid var(--color-brand-500);
  border-radius: var(--border-radius-sm);
  padding: 1.6rem 3.2rem;
`;

function OrderDataBox({ Order }: any) {
  const {
    created_at,
    total_amount,
    order_items,
    shipping_address,
    user_profile,
  } = Order;

  console.log(Order);

  return (
    <StyledOrderDataBox>
      <Header>
        <div>
          <FaMoneyBill />
          <p>
            Total Amount <span>{formatCurrency(total_amount)}</span>
          </p>
        </div>

        <p>{format(new Date(created_at), "EEE, MMM dd yyyy")}</p>
      </Header>

      <Section>
        <DataItem icon={<FaUserCheck />} label="Customer name:">
          {user_profile.last_name} {user_profile.first_name}
        </DataItem>

        <DataItem icon={<TbTruckDelivery />} label="Shipping Address:">
          {shipping_address}
        </DataItem>

        <ItemsBox>
          <h3>Order Items</h3>
          <HStack>
            {order_items.map(
              (el: { product_name: string; quantity: number }) => (
                <Tag type={"blue"}>
                  {el.quantity} {el.product_name}
                </Tag>
              )
            )}
          </HStack>
        </ItemsBox>
      </Section>
    </StyledOrderDataBox>
  );
}

export default OrderDataBox;
