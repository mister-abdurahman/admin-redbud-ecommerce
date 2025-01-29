import styled, { css } from "styled-components";
import ProductRow from "./ProductRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
// import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";
import ErrorFallback from "../../ui/ErrorFallback";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "../../ui/Pagination";
import { useTableProducts } from "./useTableProducts";
import { useBrands } from "../brands/useBrands";
import { useCategories } from "../dashboard/useCategories";
import { useEffect, useRef, useState } from "react";
import { IProduct, IProductRow } from "../../utils/types";
import SearchInput from "../../ui/SearchInput";
import { HStack } from "../../styles/styles";
import { table } from "console";

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
      props.type === "category" &&
      css`
        display: none;
      `}
  }
`;

function ProductTable() {
  const { tableProducts, error, isLoading, count } = useTableProducts();
  const {
    brands,
    isLoading: isLoadingBrands,
    error: brandsError,
  } = useBrands();
  const {
    categories,
    isLoading: loadingCategories,
    error: categoriesError,
  } = useCategories();

  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get("status");

  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<
    IProductRow[] | undefined
  >(tableProducts);

  // Filter:
  // const filteredProducts = useRef<IProductRow[] | undefined>();
  // let filteredProducts: IProductRow[] | undefined;
  // switch (filterParam) {
  //   case "all":
  //     filteredProducts = tableProducts;
  //     break;
  //   case "available":

  //     filteredProducts = tableProducts?.filter(
  //       (product: { status: boolean }) => product.status
  //     );
  //     break;
  //   default:
  //     filteredProducts = tableProducts;
  //     break;
  // }

  // console.log("table", tableProducts);
  // console.log("filtered", filteredProducts);

  useEffect(
    function () {
      switch (filterParam) {
        case "all":
          setFilteredProducts(tableProducts);
          break;
        case "available":
          setFilteredProducts(
            tableProducts?.filter(
              (product: { status: boolean }) => product.status
            )
          );
          break;
        default:
          setFilteredProducts(tableProducts);
          break;
      }

      const seachRes = tableProducts?.filter((el) =>
        el.name.toLowerCase().includes(searchText.toLowerCase())
      );
      searchText && setFilteredProducts(seachRes);
    },
    [searchText, tableProducts, filterParam]
  );

  if (isLoading || isLoadingBrands || loadingCategories) return <Spinner />;

  if (!tableProducts?.length) return <Empty resourceName={"Products"} />;
  if (error) return <ErrorFallback errorMsg={error} />;
  if (brandsError) return <ErrorFallback errorMsg={brandsError} />;
  if (categoriesError) return <ErrorFallback errorMsg={categoriesError} />;

  const brandOpts = brands?.map((el) => {
    return { label: el.name, value: el.id };
  });

  const categoriesOpts = categories?.map((el) => {
    return { label: el.name, value: el.id };
  });

  return (
    <Menus>
      {/* A beautiful API we created here! We could even have defined the widths on the columns in the table header individually, but this keeps it simpler, and I also really like it */}
      {/* <Table columns="repeat(4, 1fr"> */}
      <HStack>
        <SearchInput
          placeholderText="Search Product"
          text={searchText}
          setText={setSearchText}
        />
      </HStack>
      <Table columns="3fr 1.4fr 1.8fr 1.6fr 1.6fr 1fr">
        <Table.Header>
          <TableHeaderDiv>Product</TableHeaderDiv>
          <TableHeaderDiv type="amount">Price</TableHeaderDiv>
          <TableHeaderDiv>Status</TableHeaderDiv>
          <TableHeaderDiv type="brand">Brand</TableHeaderDiv>
          <TableHeaderDiv type="category">Category</TableHeaderDiv>
          <TableHeaderDiv></TableHeaderDiv>
        </Table.Header>

        {/* {filteredProducts.map((booking) => (
          <BookingRow key={booking.id} booking={booking} />
        ))} */}

        {/* Render props! */}
        <Table.Body
          data={filteredProducts}
          render={(product: any) => (
            <ProductRow
              key={product?.id}
              product={product}
              brands={brandOpts || []}
              categories={categoriesOpts || []}
            />
          )}
        />

        <Table.Footer>
          <Pagination count={count || 10} />{" "}
        </Table.Footer>
      </Table>
    </Menus>
  );
}

// We could create yet another layer of abstraction on top of this. We could call this component just <Results>, like: Results({data, count, isLoading, columns, rowComponent}). Then <ProductTable> and ALL other tables would simply call that.
// BUT, creating more abstractions also has a cost! More things to remember, more complex codebase to understand. Sometimes it's okay to just copy and paste instead of creating abstractions

export default ProductTable;
