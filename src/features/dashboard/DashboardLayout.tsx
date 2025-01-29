import styled from "styled-components";

import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import Spinner from "../../ui/Spinner";
import RecentOrders from "../dashboard/RecentOrders";
import { useProducts, useProductsWithBrandName } from "./useProducts";
import { useCategories } from "./useCategories";
import { useBrands } from "../brands/useBrands";
import { useOrders } from "./useOrders";
import ErrorFallback from "../../ui/ErrorFallback";
// import { useRecentStays } from './useRecentStays';
// import { useCabins } from './cabins/useCabins';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;

  @media only screen and (max-width: 500px) {
    grid-template-columns: 1fr;
    /* max-width: 30rem; */
    grid-template-rows: auto 34rem 34rem auto;
  }
`;

/*
1) BOOKINGS: the actual sales. For example, in the last 30 days, the hotel might have sold 10 bookings online, but these guests might only arrive and check in in the far future (or not, as booking also happen on-site)
2) STAYS: the actual check-in of guests arriving for their bookings. We can identify stays by their startDate, together with a status of either 'checked-in' (for current stays) or 'checked-out' (for past stays)
*/

function DashboardLayout() {
  const { isLoading, products, error } = useProducts();
  const {
    isLoading: isLoadingCategories,
    categories,
    error: categoriesError,
  } = useCategories();
  const { isLoading: isLoadingBrands, brands, error: brandError } = useBrands();
  const { isLoading: isLoadingOrders, orders, error: orderError } = useOrders();
  const {
    isLoading: isLoadingProductsWithBrandName,
    productsWithBrandName,
    error: productError,
  } = useProductsWithBrandName();

  if (
    isLoading ||
    isLoadingCategories ||
    isLoadingBrands ||
    isLoadingOrders ||
    isLoadingProductsWithBrandName
  )
    return <Spinner />;

  if (error) return <ErrorFallback errorMsg={error.message} />;
  if (categoriesError)
    return <ErrorFallback errorMsg={categoriesError.message} />;
  if (brandError) return <ErrorFallback errorMsg={brandError.message} />;
  if (orderError) return <ErrorFallback errorMsg={orderError.message} />;
  if (productError) return <ErrorFallback errorMsg={productError.message} />;

  return (
    <StyledDashboardLayout>
      <Stats
        products={products?.length || 0}
        categories={categories?.length || 0}
        brands={brands?.length || 0}
        orders={orders?.length || 0}
      />
      <RecentOrders />
      <DurationChart productsWithBrandName={productsWithBrandName!} />
      {/* <SalesChart bookings={bookings} numDays={numDays} /> */}
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
