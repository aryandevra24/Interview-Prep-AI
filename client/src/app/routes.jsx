import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import AppLayout from '../components/layout/AppLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import GuestRoute from '../components/auth/GuestRoute';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Landing = lazy(() => import('../pages/Landing'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const CreateInterview = lazy(() => import('../pages/CreateInterview'));
const SkillQuiz = lazy(() => import('../pages/SkillQuiz'));
const Reports = lazy(() => import('../pages/Reports'));
const InterviewReport = lazy(() => import('../pages/InterviewReport'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));

const PageLoader = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/interview/new" element={<CreateInterview />} />
            <Route path="/skill-quiz" element={<SkillQuiz />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/:reportId" element={<InterviewReport />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
