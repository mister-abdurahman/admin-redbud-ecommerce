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
import { IBrand, IProduct, IProductRow } from "../../utils/types";
import SearchInput from "../../ui/SearchInput";
import { HStack } from "../../styles/styles";
import { table } from "console";
import BrandRow from "./BrandRow";
import { useTableBrands } from "./useTableBrands";

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

function BrandTable() {
  const {
    brands,
    isLoading: loadingBrands,
    error: BrandsError,
    count,
  } = useTableBrands();

  const [searchText, setSearchText] = useState("");
  const [filteredBrands, setFilteredBrands] = useState<IBrand[] | undefined>(
    brands
  );

  useEffect(
    function () {
      const seachRes = brands?.filter((el) =>
        el.name.toLowerCase().includes(searchText.toLowerCase())
      );
      if (searchText) setFilteredBrands(seachRes);
      else setFilteredBrands(brands);
    },
    [searchText, brands]
  );

  if (loadingBrands) return <Spinner />;

  if (BrandsError) return <ErrorFallback errorMsg={BrandsError} />;

  return (
    <Menus>
      <HStack>
        <SearchInput
          placeholderText="Search Brand"
          text={searchText}
          setText={setSearchText}
        />
      </HStack>
      <Table columns="2fr 3fr 1.2fr .5fr">
        <Table.Header>
          <TableHeaderDiv>Brand</TableHeaderDiv>
          <TableHeaderDiv>Description</TableHeaderDiv>
          <TableHeaderDiv>Created At</TableHeaderDiv>
          <TableHeaderDiv></TableHeaderDiv>
        </Table.Header>

        <Table.Body
          data={filteredBrands}
          render={(Brand: IBrand) => <BrandRow key={Brand?.id} brand={Brand} />}
        />

        <Table.Footer>
          <Pagination count={count || 10} />{" "}
        </Table.Footer>
      </Table>
    </Menus>
  );
}

// We could create yet another layer of abstraction on top of this. We could call this component just <Results>, like: Results({data, count, isLoading, columns, rowComponent}). Then <BrandTable> and ALL other tables would simply call that.
// BUT, creating more abstractions also has a cost! More things to remember, more complex codebase to understand. Sometimes it's okay to just copy and paste instead of creating abstractions

export default BrandTable;
