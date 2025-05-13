import React, { useContext, useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [prevTheme, setPrevTheme] = useState(isDarkMode ? 'dark' : 'light');

  useEffect(() => {
    const currentTheme = isDarkMode ? 'dark' : 'light';
    if (currentTheme !== prevTheme) {
      localStorage.setItem('theme', currentTheme);
      setPrevTheme(currentTheme);
    }
  }, [isDarkMode, prevTheme]);

  return (
    <Tooltip title={isDarkMode ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}>
      <IconButton onClick={toggleTheme} color="inherit">
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;