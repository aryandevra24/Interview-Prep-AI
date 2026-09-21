import { Link, NavLink } from 'react-router';
import {
  LayoutDashboard,
  LogOut,
  Menu,
  PlusCircle,
  Sparkles,
  X,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Button from '../common/Button';
import ThemeToggle from '../common/ThemeToggle';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/interview/new', label: 'New Interview', icon: PlusCircle },
  { to: '/reports', label: 'Reports', icon: Sparkles },
];

const Navbar = ({ user, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const openCloseTimeoutRef = useRef();

  const openMenu = () => setMobileOpen(true);
  const closeMenu = () => {
    setMenuVisible(false);
    openCloseTimeoutRef.current = setTimeout(() => setMobileOpen(false), 300);
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      // start enter animation on next frame
      requestAnimationFrame(() => setMenuVisible(true));
    } else {
      document.body.style.overflow = '';
      requestAnimationFrame(() => setMenuVisible(false));
    }

    return () => {
      document.body.style.overflow = '';
      if (openCloseTimeoutRef.current)
        clearTimeout(openCloseTimeoutRef.current);
    };
  }, [mobileOpen]);

  // Close mobile menu when viewport becomes desktop-sized (e.g., toggling device toolbar)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileOpen) {
        if (openCloseTimeoutRef.current)
          clearTimeout(openCloseTimeoutRef.current);
        setMenuVisible(false);
        setMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileOpen]);

  useEffect(() => {
    return () => {
      if (openCloseTimeoutRef.current)
        clearTimeout(openCloseTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={openMenu}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="hidden font-semibold text-slate-900 sm:inline">
                Interview Prep
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-slate-900">{user?.name}</p>
              <p className="text-xs text-slate-500">@{user?.username}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Log out</span>
            </Button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className={`absolute inset-0 bg-slate-900/40 transition-opacity duration-300 ${menuVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={closeMenu}
          />
          <nav
            className={`absolute top-0 left-0 flex h-full w-72 transform flex-col bg-white p-4 shadow-xl transition-transform duration-300 ${menuVisible ? 'translate-x-0' : '-translate-x-full'} rounded-r-2xl`}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-semibold text-slate-900">Menu</span>
              <Button variant="ghost" size="sm" onClick={closeMenu}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="mb-4 border-b border-slate-300" />
            <ul className="space-y-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`
                    }
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-700">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="ml-1">{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
