import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  return window.localStorage.getItem("user") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
