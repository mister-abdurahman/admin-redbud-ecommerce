import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Logout } from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { DarkModeToggle } from "./DarkModeToggle";
import { useUser } from "../features/authentication/useUser";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;
const SmallText = styled.p`
  font-size: 12px;
  font-weight: 700;
  margin-right: 3rem;
`;

export const HeaderMenu = () => {
  const navigate = useNavigate();
  const {
    user,
    // user: { email },
  } = useUser();

  console.log(user);
  return (
    <StyledHeaderMenu>
      {/* <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li> */}
      <SmallText>Welcome, {user.email}</SmallText>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
};
