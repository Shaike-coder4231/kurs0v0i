import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
  const { isAuth, isAdmin } = useAuth();
  const location = useLocation();
  if (!isAuth) {
    sessionStorage.setItem('redirectAfterLogin', location.pathname + location.search);
    return <Navigate to="/login" replace />;
  }
  if (!isAdmin) return <Navigate to="/profile" replace />;
  return children;
}