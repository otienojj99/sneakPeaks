import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/dashboard/layout/DashboardLayout";
import Home from "../pages/app/Landing/Home";

// Auth
import Login from "../pages/auth/Login";

// Dashboard Pages
import DashboardHome from "../pages/dashboard/DashboardHome";
import Categories from "../pages/dashboard/Categories";
import Products from "../pages/dashboard/Products";
import ProductDetail from "../pages/dashboard/ProductDetail";
import Orders from "../pages/dashboard/Orders";
import Users from "../pages/dashboard/Users";
import Brands from "../pages/dashboard/Brands";
import Warehouse from "../pages/dashboard/Warehouse";
import Supplier from "../pages/dashboard/Supplier";
import Settings from "../pages/dashboard/Settings";
import Scan from "../pages/dashboard/Scan";
import Checkin from "../pages/dashboard/CheckIn";
import InventoryCounts from "../pages/dashboard/InventoryCounts";
import InventoryCountDetail from "../pages/dashboard/InventoryCountDetail";

const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Auth */}
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="categories" element={<Categories />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="orders" element={<Orders />} />
        <Route path="customers" element={<Users />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
        <Route path="brands" element={<Brands />} />
        <Route path="warehouse" element={<Warehouse />} />
        <Route path="supplier" element={<Supplier />} />
        <Route path="scanner" element={<Scan />} />
        <Route path="inventory" element={<Checkin />} />
        <Route path="inventory_operations" element={<InventoryCounts />} />
        <Route path=":id" element={<InventoryCountDetail />} />
      </Route>

      <Route path="/" element={<Home />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRouter;
