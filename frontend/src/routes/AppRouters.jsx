import { createBrowserRouter, RouterProvider } from 'react-router';
import AuthLayout from '../layouts/AuthLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import HomeLayout from '../layouts/HomeLayout';
import HomePage from '../pages/HomePage';
import SettingPage from '../pages/SettingPage';
import UploadCertificatePage from '../pages/UploadCertificatePage';
import DocumentsPage from '../pages/DocumentsPage';
import MyVerificationsPage from '../pages/MyVerificationsPage';
import UploadDataPage from '../pages/UploadDataPage';

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
                            element: <HomePage />
                        },
                        {
                            path: "my-Verifications",
                            element: <MyVerificationsPage />
                        },
                        {
                            path: "upload-data",
                            element: <UploadDataPage />
                        },
                        {
                            path: "upload-certificate",
                            element: <UploadCertificatePage />
                        },
                        {
                            path: "document",
                            element: <DocumentsPage />
                        },
                        {
                            path: "settings",
                            element: <SettingPage />
                        }
                    ]
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />
}

export default AppRouters;
