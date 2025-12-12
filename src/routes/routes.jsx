import { createBrowserRouter } from "react-router-dom";
import Login from "../page/auth/Login";
import ForgotPasswordFlow from "../page/auth/ForgotPasswordFlow";

const router = createBrowserRouter([
    {
        path: "/",
        element: <p>Home</p>,
    },
    {path: "/login",element: <Login />},
    {path: "/forget-password",element: <ForgotPasswordFlow />},
])

export default router;