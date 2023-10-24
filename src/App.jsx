import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProjectPage from './pages/AddProjectPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { useEffect, useState } from 'react';
import { Box, Skeleton, Spinner } from '@chakra-ui/react';
import { useLazyGetMeQuery } from './store/rtq-apis/api';
import { useDispatch } from 'react-redux';
import { setUser } from './store/redux/userAuthSlice';
import ProtectedRoute from './components/ui/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Navigate to={'home'} />} />
      <Route path='home' element={<HomePage />} />
      <Route path='login' element={<LoginPage />} />
      <Route
        path='new-project'
        element={
          <ProtectedRoute allowedRole={'user'}>
            <AddProjectPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='admin-dashboard'
        element={
          <ProtectedRoute allowedRole={'admin'}>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='profile'
        element={
          <ProtectedRoute allowedRole={'user'}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path='signup' element={<SignupPage />} />
      <Route path='projects' element={<ProjectPage />} />
    </Route>
  )
);
function App() {
  const [appReady, setAppReady] = useState(false);
  const [trigger, result] = useLazyGetMeQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    const presistToken = async () => {
      const token = localStorage.getItem('token');
      console.log(token, 'token++++++++++++++++++++++++++');
      if (token) {
        await trigger(token);
      }
      setAppReady(true);
    };
    presistToken();
  }, [trigger]);
  useEffect(() => {
    document.title = 'CodeFair';
  }, []);
  useEffect(() => {
    if (result.data) {
      dispatch(
        setUser({
          ...result.data.data[0],
          token: localStorage.getItem('token'),
        })
      );
    }
  }, [result.data, dispatch]);

  return (
    <>
      {!appReady && (
        <>
          <Box className='flex justify-center mt-3'>
            <Spinner
              colorScheme='teal'
              color='teal'
              size='xl'
              className='mx-auto w-fit'
            />
          </Box>
          <Skeleton className='min-h-[90vh] flex justify-center items-center mx-auto max-w-[1400px]  mt-2' />
        </>
      )}
      {appReady && (
        <>
          <RouterProvider router={routes}></RouterProvider>
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default App;
