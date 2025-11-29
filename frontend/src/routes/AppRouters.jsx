import { createBrowserRouter, RouterProvider } from 'react-router';
import AuthLayout from '../layouts/AuthLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import HomeLayout from '../layouts/HomeLayout';
import HomaPage from '../pages/HomaPage';
import Settingspage from '../pages/Settingspage';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';

const AppRouters = () => {

    const router = createBrowserRouter([
        {
            path:"/",
            element:<AuthLayout/>
        },
        {
            path:"/register",
            element:<Register/>
        },
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"/home",
            element:<ProtectedRoute/>,
            children:[
                {
                    path:"",
                    element:<HomeLayout/>,
                    children:[
                        {
                            path:"",
                            element:<HomaPage/>
                        },
                        {
                            Path:"",
                            element:<Settingspage/>
                        }
                    ]
                }
            ]
        }
    ])

  return <RouterProvider router={router} />
}

export default AppRouters;
