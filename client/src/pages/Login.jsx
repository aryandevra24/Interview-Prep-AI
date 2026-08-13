import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router';
import Alert from '../components/common/Alert';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import AuthLayout from '../components/layout/AuthLayout';
import { clearAuthError, login } from '../features/auth/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error } = useSelector(state => state.auth);

  const [validationErrors, setValidationErrors] = useState({});

  const from = location.state?.from || '/dashboard';

  useEffect(() => {
    return () => dispatch(clearAuthError());
  }, [dispatch]);

  const validate = (identifier, password) => {
    const errors = {};
    if (!identifier.trim())
      errors.identifier = 'Email or username is required.';
    if (!password) errors.password = 'Password is required.';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const identifier = (formData.get('identifier') || '').toString();
    const password = (formData.get('password') || '').toString();

    if (!validate(identifier, password)) return;

    const isEmail = identifier.includes('@');
    const payload = {
      password,
      ...(isEmail
        ? { email: identifier.trim() }
        : { username: identifier.trim() }),
    };

    const result = await dispatch(login(payload));
    if (login.fulfilled.match(result)) {
      navigate(from, { replace: true });
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to access your interview analyses and preparation plans."
    >
      {error && (
        <Alert variant="error" className="mb-6">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <Input
          id="identifier"
          name="identifier"
          label="Email or username"
          autoComplete="username"
          error={validationErrors.identifier}
          placeholder="you@example.com"
        />

        <Input
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          error={validationErrors.password}
          placeholder="******"
        />

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Don&apos;t have an account?{' '}
        <Link
          to="/register"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
