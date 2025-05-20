import { JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useUserContext } from "@/context/user";

import { RedirectHandle } from "@/components";
import Layout from "@/Layout";
import {
  LoginPage,
  ItemsPage,
  OrdersPage,
  CategoriesPage,
  OrdersHistoryPage,
  QrCodesPage,
} from "@/pages";

function App() {
  const { isAuthenticated } = useUserContext();

  const routeGuard = (page: JSX.Element) =>
    isAuthenticated ? page : <Navigate to={{ pathname: "/login" }} />;

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <Routes>
          <Route
            path="/"
            element={routeGuard(
              <Layout>
                <RedirectHandle />
              </Layout>
            )}
          />

          <Route
            path="/restaurant/:restaurantCode/branch/:branchCode/orders"
            element={routeGuard(
              <Layout>
                <OrdersPage />
              </Layout>
            )}
          />
          <Route
            path="/restaurant/:restaurantCode/branch/:branchCode/order-history"
            element={routeGuard(
              <Layout>
                <OrdersHistoryPage />
              </Layout>
            )}
          />
          <Route
            path="/restaurant/:restaurantCode/branch/:branchCode/qr-codes"
            element={routeGuard(
              <Layout>
                <QrCodesPage />
              </Layout>
            )}
          />
          <Route
            path="/restaurant/:restaurantCode/branch/:branchCode/items"
            element={routeGuard(
              <Layout>
                <ItemsPage />
              </Layout>
            )}
          />
          <Route
            path="/restaurant/:restaurantCode/branch/:branchCode/categories"
            element={routeGuard(
              <Layout>
                <CategoriesPage />
              </Layout>
            )}
          />

          <Route
            path="*"
            element={routeGuard(
              <Layout>
                <RedirectHandle />
              </Layout>
            )}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
