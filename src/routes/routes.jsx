import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../page/auth/Login";
import ForgotPasswordFlow from "../page/auth/ForgotPasswordFlow";
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import Dashboard from "../components/dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element:  <Navigate to="/dashboard" replace />,
  },
  { path: "/login", element: <Login /> },
  { path: "/forget-password", element: <ForgotPasswordFlow /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
