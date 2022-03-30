import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = ({ isLoggedIn, children }: any) => {
  console.log('in PrivateRouter: ', isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to='/login' replace />;
  }
  return <Outlet />;
};

export default PrivateRouter;
