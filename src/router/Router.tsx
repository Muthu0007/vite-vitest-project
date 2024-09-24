import { lazy } from "react";
const Register = lazy(() => import("../component/Register/Register.tsx"));
import { createBrowserRouter } from "react-router-dom";
import { PrivateRouter } from "./PrivateRouter";
const Login = lazy(() => import("../component/Login/Login"));
const Dashboard = lazy(() => import("../component/Dashboard/Dashboard"));





const router = createBrowserRouter([
    {
        path: '/',
        element: (<Login />)
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRouter>
                <Dashboard />
            </PrivateRouter>
        )
    }
]);

export default router;