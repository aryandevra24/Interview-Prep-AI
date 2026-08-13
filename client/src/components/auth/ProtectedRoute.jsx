import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router';
import LoadingSpinner from '../common/LoadingSpinner';

const ProtectedRoute = () => {
  const location = useLocation();
  const { isAuthenticated, isInitialized } = useSelector(state => state.auth);

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
