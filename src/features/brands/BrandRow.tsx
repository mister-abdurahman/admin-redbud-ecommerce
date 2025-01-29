import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { HiTrash, HiEye } from "react-icons/hi2";

import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal-v1";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

import { format } from "date-fns";
import { IBrand } from "../../utils/types";
import BrandForm from "./BrandForm";
import { spawn } from "child_process";

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
      props.type === "Brand" &&
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

function BrandRow({ brand }: { brand: IBrand }) {
  // const { deleteBrand, isDeleting } = useDeleteBrand();

  const { id: BrandId, name, description, created_at } = brand;

  const navigate = useNavigate();
  // We will not allow editing at this point, as it's too complex for bookings... People just need to delete a booking and create a new one

  return (
    // <div>row</div>
    <Table.Row role="row">
      <Modal>
        <Cabin>{name}</Cabin>

        <Stacked>
          {description ? (
            <span> {description?.slice(0, 40)}... </span>
          ) : (
            <span></span>
          )}
        </Stacked>

        <Stacked>
          <span> {format(new Date(created_at), "MMM dd yyyy")} </span>
        </Stacked>

        <Menus.Menu>
          <Menus.Toggle id={BrandId} />
          <Menus.List id={BrandId}>
            <Modal.Open opens={"edit-form"}>
              <Menus.Button icon={<HiEye />}>Open</Menus.Button>
            </Modal.Open>
            {/* <Modal.Open opens={"delete"}>
              <Menus.Button icon={<HiTrash />}>
                {isDeleting ? "Deleting..." : "Delete"}
              </Menus.Button>
            </Modal.Open> */}
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name={"edit-form"}>
          <BrandForm BrandToEdit={brand} />
        </Modal.Window>

        {/* <Modal.Window name={"delete"}>
          <ConfirmDelete
            resource={"Brand"}
            onConfirm={() => deleteBrand(BrandId)}
            extraInfo="Note that deleting this Brand deletes any product under it, ⚠ deleting should be avoided at all cost."
          />
        </Modal.Window> */}
      </Modal>
    </Table.Row>
  );
}

export default BrandRow;
