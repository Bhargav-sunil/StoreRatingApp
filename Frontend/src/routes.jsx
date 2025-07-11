import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import OwnerDashboard from "./components/OwnerDashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import Navbar from "./components/Navbar";

const AppRoutes = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="System Administrator">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute role="Normal User">
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/owner"
        element={
          <ProtectedRoute role="Store Owner">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  </>
);

export default AppRoutes;
