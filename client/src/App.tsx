import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./pages/layouts/RootLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./pages/layouts/DashboardLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import "./App.css";
import NotFoundPage from "./pages/NotFoundPage";
import Dashboard from "./pages/Dashboard";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentError from "./pages/PaymentError";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProductDetails from "./pages/ProductDetails";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import RecentViews from "./pages/RecentViews";
import OrderHistory from "./pages/OrderHistory";
import VendorOrderHistory from "./pages/VendorOrderHistory";
import Comparison from "./pages/Comparison";
import ManageProducts from "./pages/ManageProducts";
import ManageReviews from "./pages/ManageReviews";
import Products from "./pages/Products";
import ManageCategories from "./pages/ManageCategories";
import ManageUsers from "./pages/ManageUsers";
import ManageTransactions from "./pages/ManageTransactions";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route
              path="/order-history"
              element={
                <ProtectedRoute restrictTo={["user", "vendor", "admin"]}>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/products" element={<Products />} />

            <Route path="/transaction/success" element={<PaymentSuccess />} />
            <Route path="/transaction/error" element={<PaymentError />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute restrictTo={["user", "vendor", "admin"]}>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route path="/recent-views" element={<RecentViews />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/shops/:id" element={<Shop />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />

            <Route path="dashboard" element={<DashboardLayout />}>
              <Route
                index
                element={
                  <ProtectedRoute restrictTo={["vendor", "admin"]}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="manage-products"
                element={
                  <ProtectedRoute restrictTo={["vendor"]}>
                    <ManageProducts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="order-history/:shopId"
                element={
                  <ProtectedRoute restrictTo={["vendor"]}>
                    <VendorOrderHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="manage-reviews"
                element={
                  <ProtectedRoute restrictTo={["vendor"]}>
                    <ManageReviews />
                  </ProtectedRoute>
                }
              />
              <Route
                path="manage-categories"
                element={
                  <ProtectedRoute restrictTo={["admin"]}>
                    <ManageCategories />
                  </ProtectedRoute>
                }
              />
              <Route
                path="manage-users"
                element={
                  <ProtectedRoute restrictTo={["admin"]}>
                    <ManageUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="manage-transactions"
                element={
                  <ProtectedRoute restrictTo={["admin"]}>
                    <ManageTransactions />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Catch-all route for 404 - Page Not Found */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
