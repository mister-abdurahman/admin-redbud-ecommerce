import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import GlobalStyles from "./styles/GlobalStyles";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import Orders from "./pages/Orders";
import Order from "./pages/Order";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />}></Route>
              <Route path="dashboard" element={<Dashboard />}></Route>
              <Route path="products" element={<Products />}></Route>
              <Route path="categories" element={<Categories />}></Route>
              <Route path="brands" element={<Brands />}></Route>
              <Route path="orders" element={<Orders />}></Route>
              <Route path="orders/:orderId" element={<Order />}></Route>
              <Route
                path="product_tags"
                element={<h1>Product Tags</h1>}
              ></Route>
              <Route path="account" element={<h1>Account info</h1>}></Route>
            </Route>

            <Route path="login" element={<Login />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
