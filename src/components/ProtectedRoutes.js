import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export const AdminRoute = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  return isLoggedIn && user?.role === 'admin' ? <Outlet /> : <Navigate to="/" replace />;
};