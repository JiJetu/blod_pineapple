import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../page/auth/Login";
import ForgotPasswordFlow from "../page/auth/ForgotPasswordFlow";
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import Dashboard from "../page/dashboard/Dashboard";
import StudentManagement from "../page/dashboard/StudentManagement";
import AwardAssignment from "../page/dashboard/AwardAssignment";
import CertificateGeneration from "../page/dashboard/CertificateGeneration";
import Faction from "../page/dashboard/Faction";

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
      {
        path: "students",
        element: <StudentManagement />,
      },
      {
        path: "award-assign",
        element: <AwardAssignment />,
      },
      {
        path: "certificate",
        element: <CertificateGeneration />,
      },
      {
        path: "faction",
        element: <Faction />,
      },
    ],
  },
]);

export default router;
