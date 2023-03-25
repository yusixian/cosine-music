import { useTheme } from 'next-themes';
import { useCallback } from 'react';
import { useIsMounted } from './useIsMounted';
import { useThrottle } from './useThrottle';

/**
 * 它返回一个在明暗之间切换的函数。
 * @returns 切换主题的函数
 */
export const useToggleTheme = () => {
  const isMounted = useIsMounted();
  const { theme, setTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    if (!isMounted) return null;
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [isMounted, setTheme, theme]);

  return useThrottle(toggleTheme);
};
