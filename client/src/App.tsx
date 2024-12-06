import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/AboutUs";
import RootLayout from "./pages/layouts/RootLayout";
import ManageBookings from "./pages/ManageBookings";
import ManageCars from "./pages/ManageCars";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./pages/layouts/DashboardLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import "./App.css";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Booking from "./pages/Booking";
import NotFoundPage from "./pages/NotFoundPage";
import Dashboard from "./pages/Dashboard";
import ManageUsers from "./pages/ManageUser";
import ManageReturn from "./pages/ManageReturn";
import ManagePayment from "./pages/ManagePayment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentError from "./pages/PaymentError";

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
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="cars" element={<Cars />} />
            <Route path="car/:carId" element={<CarDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />

            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-service" element={<TermsOfService />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/error" element={<PaymentError />} />

            <Route
              path="booking"
              element={
                <ProtectedRoute restrictTo={["admin", "user"]}>
                  <Booking />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes */}
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="manage-bookings"
                element={
                  <ProtectedRoute>
                    <ManageBookings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="manage-cars"
                element={
                  <ProtectedRoute restrictTo={["admin"]}>
                    <ManageCars />
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
                path="manage-return"
                element={
                  <ProtectedRoute restrictTo={["admin"]}>
                    <ManageReturn />
                  </ProtectedRoute>
                }
              />
              <Route
                path="manage-payment"
                element={
                  <ProtectedRoute restrictTo={["user"]}>
                    <ManagePayment />
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
