import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";
import { Flag } from "../../ui/Flag";
import Tag from "../../ui/Tag";
import { IOrder, IOrdersByDateRes } from "../../utils/types";
import { getProfileById } from "../../services/apiProfile";
import { useProfileById } from "./useProfileByid";
import { format, parseISO } from "date-fns";

// grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  @media only screen and (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
  /* &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  } */
`;

const Guest = styled.div`
  font-weight: 500;
  display: flex;
  gap: 4px;
`;

const StyledDiv = styled.div`
  display: block;

  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;

function TodayItem({ stay }: { stay: IOrdersByDateRes }) {
  const {
    id,
    status,
    created_at,
    user_profiles: { first_name, last_name },
  } = stay;

  // const {profile, error, } = useProfileById(user_id);

  return (
    <StyledTodayItem>
      <Tag type={status ? "green" : "red"}>
        {status ? "Successful" : "Failed"}
      </Tag>
      <Guest>
        <span>{last_name}</span>
        <span>{first_name}</span>
      </Guest>
      <StyledDiv>
        {created_at && format(parseISO(created_at), "MM/dd/yyyy")}
      </StyledDiv>
      <Button variation="primary" size="small" as={Link} to={`/orders/${id}`}>
        View
      </Button>
    </StyledTodayItem>
  );
}

export default TodayItem;
