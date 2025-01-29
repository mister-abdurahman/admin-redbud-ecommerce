import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineBanknotes,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import styled from "styled-components";
import { FaProductHunt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import { BiSolidPurchaseTag } from "react-icons/bi";

const StyledStatsContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  /* display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr; */

  @media only screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 1.4rem;
  }
`;
interface IProps {
  products: number;
  categories: number;
  brands: number;
  orders: number;
}
function Stats({ products, categories, brands, orders }: IProps) {
  return (
    <StyledStatsContainer>
      <Stat
        icon={<FaProductHunt />}
        title="Products"
        value={products}
        color="blue"
      />
      <Stat
        icon={<MdCategory />}
        title="categories"
        value={categories}
        color="green"
      />
      <Stat
        icon={<SiBrandfolder />}
        title="Brands"
        value={brands}
        color="indigo"
      />
      <Stat
        icon={<BiSolidPurchaseTag />}
        title="Orders"
        value={orders}
        color="yellow"
      />
    </StyledStatsContainer>
  );
}

export default Stats;
