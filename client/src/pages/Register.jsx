import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import Alert from '../components/common/Alert';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import AuthLayout from '../components/layout/AuthLayout';
import { clearAuthError, register } from '../features/auth/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector(state => state.auth);

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    return () => dispatch(clearAuthError());
  }, [dispatch]);

  const validate = form => {
    const errors = {};
    if (!form.name.trim() || form.name.trim().length < 3) {
      errors.name = 'Name must be at least 3 characters.';
    }
    if (!form.username.trim()) {
      errors.username = 'Username is required.';
    } else if (!/^[a-zA-Z0-9]+$/.test(form.username)) {
      errors.username = 'Username must be alphanumeric.';
    }
    if (!form.email.trim()) {
      errors.email = 'Email is required.';
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(form.email)
    ) {
      errors.email = 'Enter a valid email address.';
    }
    if (!form.password || form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }
    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const form = {
      name: (formData.get('name') || '').toString(),
      username: (formData.get('username') || '').toString(),
      email: (formData.get('email') || '').toString(),
      password: (formData.get('password') || '').toString(),
      confirmPassword: (formData.get('confirmPassword') || '').toString(),
    };

    if (!validate(form)) return;

    const result = await dispatch(
      register({
        name: form.name.trim(),
        username: form.username.trim().toLowerCase(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      })
    );

    if (register.fulfilled.match(result)) {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start analyzing interviews and optimizing your resume with AI."
    >
      {error && (
        <Alert variant="error" className="mb-6">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <Input
          id="name"
          name="name"
          label="Full name"
          autoComplete="name"
          error={validationErrors.name}
        />

        <Input
          id="username"
          name="username"
          label="Username"
          autoComplete="username"
          error={validationErrors.username}
          hint="Letters and numbers only"
        />

        <Input
          id="email"
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          error={validationErrors.email}
        />

        <Input
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          error={validationErrors.password}
        />

        <Input
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          error={validationErrors.confirmPassword}
        />

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
