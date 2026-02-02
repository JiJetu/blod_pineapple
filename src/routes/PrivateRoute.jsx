import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const accessToken = useSelector((s) => s.auth.accessToken);
  return accessToken ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
