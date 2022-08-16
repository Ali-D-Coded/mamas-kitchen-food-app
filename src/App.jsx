
// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import NotFound from "./components/NotFound";

import Home from "./pages/Home/Home";
import AuthPage from "./pages/auth/AuthPage";
import RequireAuth from "./components/RequireAuth";
import Profile from "./pages/profile/Profile";
import Payment from "./pages/payment/Payment";
import UnAuthorized from "./pages/UnAuthorized";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import AdminAuth from "./pages/admin/auth/AdminAuth";
import RequireAdminAuth from "./components/RequireAdminAuth";
import Users from "./pages/admin/users/Users";
import Items from "./pages/admin/items/Items";
import Plans from "./pages/admin/plans/Plans";
import Categories from "./pages/admin/categories/Categories";
import Sidebar from "./components/Sidebar";
import CreateItems from "./pages/admin/items/CreateItems";
import Orders from "./pages/admin/orders/Orders";
import SuccessPayment from "./pages/payment/SuccessPayment";
import { CancelledPayment } from "./pages/payment/CancelledPayment";
import { Shop } from "./pages/Home/Shop";

function App() {
  return (
    <Routes>
      <Route element={<RequireAuth allowedRoles={2} />}>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
             </Layout>
          }
        />
        <Route
          path="/shop"
          element={
            <Layout>
              <Shop />
            </Layout>
          }
        />
        <Route path="profile" element={<Profile />} />
        <Route path="payment" element={<Payment />} />
        <Route path="payment-success" element={<SuccessPayment />} />
        <Route path="payment-cancelled" element={<CancelledPayment />} />
      </Route>

      <Route element={<RequireAdminAuth allowedRoles={1} />}>
        <Route
          path="admin/dashboard"
          element={
            <Sidebar>
              <Dashboard />
            </Sidebar>
          }
        />
        <Route
          path="admin/dashboard/users"
          element={
            <Sidebar>
              <Users />
            </Sidebar>
          }
        />
        <Route
          path="admin/dashboard/items"
          element={
            <Sidebar>
              <Items />
            </Sidebar>
          }
        />
        <Route
          path="admin/dashboard/plans"
          element={
            <Sidebar>
              <Plans />
            </Sidebar>
          }
        />
        <Route
          path="admin/dashboard/categories"
          element={
            <Sidebar>
              <Categories />
            </Sidebar>
          }
        />
        <Route
          path="admin/dashboard/items/create-items"
          element={
            <Sidebar>
              <CreateItems />
            </Sidebar>
          }
        />
        <Route
          path="admin/dashboard/orders"
          element={
            <Sidebar>
              <Orders />
            </Sidebar>
          }
        />
      </Route>

      <Route path="auth" element={<AuthPage />} />
      <Route path="admin/auth/login" element={<AdminAuth />} />
      <Route path="unauthorized" element={<UnAuthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
