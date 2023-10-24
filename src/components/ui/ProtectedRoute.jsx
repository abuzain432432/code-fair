/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUser } from '../../store/redux/userAuthSlice';

function ProtectedRoute({ children, allowedRole }) {
  const user = useSelector(getUser);
  if (!user) {
    return <Navigate to={'/login'}></Navigate>;
  }
  if (user.role === 'admin') {
    return <>{children}</>;
  }
  if (allowedRole !== user.role) {
    return <Navigate to={'/home'}></Navigate>;
  }
  return <>{children}</>;
}

export default ProtectedRoute;
