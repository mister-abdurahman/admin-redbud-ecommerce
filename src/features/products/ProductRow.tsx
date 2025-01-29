import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  HiTrash,
  HiEye,
  HiArrowUpOnSquare,
  HiArrowDownOnSquare,
} from "react-icons/hi2";

import Tag from "../../ui/Tag";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal-v1";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

// import { useDeleteBooking } from "../../features/bookings/useDeleteBooking";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { format, isToday } from "date-fns";
import { IProductRow } from "../../utils/types";
import ProductForm from "./ProductForm";
import useDeleteProduct from "./useDeleteProduct";

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
      props.type === "category" &&
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

function ProductRow({
  product,
  brands,
  categories,
}: {
  product: IProductRow;
  brands: { label: string; value: number }[];
  categories: { label: string; value: number }[];
}) {
  const { deleteProduct, isDeleting } = useDeleteProduct();
  //   const { checkout, isCheckingOut } = useCheckout();
  //   const { deleteBooking, isDeleting } = useDeleteBooking();

  const {
    id: productId,
    name,
    price,
    status,
    brands: { name: brandName },
    categories: { name: categoryName },
  } = product;

  const navigate = useNavigate();
  // We will not allow editing at this point, as it's too complex for bookings... People just need to delete a booking and create a new one

  return (
    // <div>row</div>
    <Table.Row role="row">
      <Modal>
        <Cabin>{name}</Cabin>

        <Amount type="amount">{formatCurrency(price)}</Amount>

        <Tag type={status ? "green" : "red"}>
          {status ? "Available" : "Out of stock"}
        </Tag>

        <Stacked type="brand">
          <span> {brandName} </span>
        </Stacked>

        <Stacked type="category">
          <span> {categoryName} </span>
        </Stacked>

        <Menus.Menu>
          <Menus.Toggle id={productId} />
          <Menus.List id={productId}>
            <Modal.Open opens={"edit-form"}>
              <Menus.Button icon={<HiEye />}>Open</Menus.Button>
            </Modal.Open>
            <Modal.Open opens={"delete"}>
              <Menus.Button icon={<HiTrash />}>
                {isDeleting ? "Deleting..." : "Delete"}
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name={"edit-form"}>
          <ProductForm
            productToEdit={product}
            brands={brands}
            categories={categories}
          />
        </Modal.Window>

        <Modal.Window name={"delete"}>
          <ConfirmDelete
            resource={"Product"}
            onConfirm={() => deleteProduct(productId)}
            extraInfo="Note that deleting this product deletes every product_tag, user cart item and order item attached to it."
          />
        </Modal.Window>

        {/* VIDEO we could export this into own component... */}
        {/* <Modal>
        <Menus.Menu>
          <Menus.Toggle id={productId} />
          <Menus.List id={productId}>
            <Menus.Button
              onClick={() => navigate(`/bookings/${productId}`)}
              icon={<HiEye />}
            >
              See details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                onClick={() => navigate(`/checkin/${productId}`)}
                icon={<HiArrowDownOnSquare />}
              >
                Check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                // onClick={() => checkout(productId)}
                // disabled={isCheckingOut}
                icon={<HiArrowUpOnSquare />}
              >
                Check out
              </Menus.Button>
            )}

            <Menus.Button icon={<HiPencil />}>Edit booking</Menus.Button>

            <Modal.Toggle opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Toggle>
          </Menus.List>
        </Menus.Menu>

        // This needs to be OUTSIDE of the menu, which in no problem. The compound component gives us this flexibility
        <Modal.Window name="delete">
          <ConfirmDelete
            resource="booking"
            // These options will be passed wherever the function gets called, and they determine what happens next
            // onConfirm={(options) => deleteBooking(productId, options)}
            // disabled={isDeleting}
          />
        </Modal.Window>
      </Modal> */}

        {/* <div>
        <ButtonWithConfirm
          title='Delete booking'
          description='Are you sure you want to delete this booking? This action can NOT be undone.'
          confirmBtnLabel='Delete'
          onConfirm={() => deleteBooking(productId)}
          disabled={isDeleting}
        >
          Delete
        </ButtonWithConfirm>

        <Link to={`/bookings/${productId}`}>Details &rarr;</Link>
      </div> */}
      </Modal>
    </Table.Row>
  );
}

export default ProductRow;
