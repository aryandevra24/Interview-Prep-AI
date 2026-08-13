import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import LoadingSpinner from '../common/LoadingSpinner';

const GuestRoute = () => {
  const { isAuthenticated, isInitialized } = useSelector(state => state.auth);

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
