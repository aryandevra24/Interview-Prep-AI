import { Moon, Sun } from 'lucide-react';
import Button from './Button';
import { useTheme } from '../../theme/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="sr-only">{isDark ? 'Light mode' : 'Dark mode'}</span>
    </Button>
  );
};

export default ThemeToggle;
