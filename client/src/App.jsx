import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import store from './app/store';
import AppRoutes from './app/routes';
import { initializeAuth } from './features/auth/authSlice';
import { ThemeProvider } from './theme/ThemeProvider';

const AuthInitializer = ({ children }) => {
  useEffect(() => {
    store.dispatch(initializeAuth());
  }, []);

  return children;
};

const App = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <BrowserRouter>
          <AuthInitializer>
            <AppRoutes />
          </AuthInitializer>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
