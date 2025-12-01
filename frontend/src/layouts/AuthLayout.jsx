import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const AuthLayout = () => {

  const navigate = useNavigate();

  const { user, isLoggedin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user !== null && isLoggedin) {
      navigate("/home")
    }
  }, [user, isLoggedin]);

  const [toggle, setToggle] = useState(true);

  return (
    <>
      <div>
        {toggle ? (
          <Login setToggle={setToggle} />
        ) : (
          <Register setToggle={setToggle} />
        )}
      </div>
    </>
  )
}

export default AuthLayout;
