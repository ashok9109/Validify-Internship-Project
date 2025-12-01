import { useEffect } from 'react';
import AppRouters from './routes/AppRouters';
import { axiosinstance } from './config/axiosinstance';
import { useDispatch } from 'react-redux';
import { addUser } from './features/reducers/authSlice';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {

        const response = await axiosinstance.get("/api/user/me");

        if (response) {
          dispatch(addUser(response.data.user));

        }
      } catch (error) {
        console.log("error in /me api", error);
      }
    })()
  }, [dispatch]);



  return (
    <>
      <div>
        <AppRouters />
      </div>
    </>
  )
}

export default App;
