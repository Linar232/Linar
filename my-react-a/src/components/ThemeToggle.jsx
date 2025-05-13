import React, { useContext, useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material'; // Добавляем Tooltip
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  // Сохраняем тему в localStorage при её изменении
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Загружаем тему из localStorage при монтировании
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      toggleTheme(); // Переключаем на тёмную тему, если она была сохранена
    }
  }, [toggleTheme]);

  return (
    <Tooltip title={isDarkMode ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}>
      <IconButton onClick={toggleTheme} color="inherit">
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;