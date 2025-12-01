import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';

const ProtectedRoute = () => {

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/home")
    } else {
      navigate("/")
    }
  }, [user, dispatch]);

  return <Outlet/>
}

export default ProtectedRoute;
