import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import { logout } from '../../features/auth/authSlice';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AppLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="mx-auto flex w-full max-w-7xl">
        <Sidebar />
        <main className="min-h-[calc(100vh-4rem)] flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
