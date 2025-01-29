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
import { ICategory, IProduct, IProductRow } from "../../utils/types";
import SearchInput from "../../ui/SearchInput";
import { HStack } from "../../styles/styles";
import { table } from "console";
import CategoryRow from "./CategoryRow";
import { useTableCategories } from "./useTableCategories";

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

function CategoryTable() {
  const {
    categories,
    isLoading: loadingCategories,
    error: categoriesError,
    count,
  } = useTableCategories();

  const [searchText, setSearchText] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<
    ICategory[] | undefined
  >(categories);

  useEffect(
    function () {
      const seachRes = categories?.filter((el) =>
        el.name.toLowerCase().includes(searchText.toLowerCase())
      );
      if (searchText) setFilteredCategories(seachRes);
      else setFilteredCategories(categories);
    },
    [searchText, categories]
  );

  if (loadingCategories) return <Spinner />;

  if (categoriesError) return <ErrorFallback errorMsg={categoriesError} />;

  return (
    <Menus>
      <HStack>
        <SearchInput
          placeholderText="Search Category"
          text={searchText}
          setText={setSearchText}
        />
      </HStack>
      <Table columns="2fr 3fr 1.2fr .5fr">
        <Table.Header>
          <TableHeaderDiv>Category</TableHeaderDiv>
          <TableHeaderDiv>Description</TableHeaderDiv>
          <TableHeaderDiv>Created At</TableHeaderDiv>
          <TableHeaderDiv></TableHeaderDiv>
        </Table.Header>

        <Table.Body
          data={filteredCategories}
          render={(category: ICategory) => (
            <CategoryRow key={category?.id} category={category} />
          )}
        />

        <Table.Footer>
          <Pagination count={count || 10} />{" "}
        </Table.Footer>
      </Table>
    </Menus>
  );
}

// We could create yet another layer of abstraction on top of this. We could call this component just <Results>, like: Results({data, count, isLoading, columns, rowComponent}). Then <CategoryTable> and ALL other tables would simply call that.
// BUT, creating more abstractions also has a cost! More things to remember, more complex codebase to understand. Sometimes it's okay to just copy and paste instead of creating abstractions

export default CategoryTable;
