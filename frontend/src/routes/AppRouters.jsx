import { createBrowserRouter, RouterProvider } from 'react-router';
import AuthLayout from '../layouts/AuthLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import HomeLayout from '../layouts/HomeLayout';
import HomaPage from '../pages/HomaPage';
import Settingspage from '../pages/Settingspage';

const AppRouters = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <AuthLayout />
        },
        {
            path: "/home",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "",
                    element: <HomeLayout />,
                    children: [
                        {
                            path: "",
                            element: <HomaPage />
                        },
                        {
                            Path: "settings",
                            element: <Settingspage />
                        }
                    ]
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />
}

export default AppRouters;
