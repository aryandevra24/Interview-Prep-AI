import { useEffect, useState } from 'react';
import { ThemeContext } from './themeContext';

const THEME_STORAGE_KEY = 'interview-prep-theme';
const getSystemTheme = () =>
  window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

const getInitialTheme = () => {
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return savedTheme === 'light' || savedTheme === 'dark'
    ? savedTheme
    : getSystemTheme();
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mediaQuery) return undefined;

    const handleSystemThemeChange = event => {
      if (!window.localStorage.getItem(THEME_STORAGE_KEY)) {
        setTheme(event.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener?.('change', handleSystemThemeChange);
    return () =>
      mediaQuery.removeEventListener?.('change', handleSystemThemeChange);
  }, []);

  const toggleTheme = () => {
    setTheme(currentTheme => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      return nextTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
