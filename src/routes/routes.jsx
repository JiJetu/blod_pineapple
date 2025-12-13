import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../page/auth/Login";
import ForgotPasswordFlow from "../page/auth/ForgotPasswordFlow";
import DashboardLayout from "../layout/dashboard/DashboardLayout";

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
        element: <p>Dashboard Home</p>,
      },
    ],
  },
]);

export default router;
