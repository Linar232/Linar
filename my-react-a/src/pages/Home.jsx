// src/pages/Home.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '../hooks/useTheme'; // Импортируем кастомный хук

const Home = () => {
  const { isDarkMode } = useTheme(); // Получаем состояние темы

  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: isDarkMode ? '#121212' : '#f9f9f9', // Фон страницы
        color: isDarkMode ? '#fff' : '#000', // Цвет текста
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      {/* Верхняя часть страницы */}
      <Typography
        variant="h1"
        sx={{
          fontStyle: 'italic',
          color: isDarkMode ? '#FFD700' : '#673ab7', // Динамический цвет заголовка
        }}
      >
        Hello World
      </Typography>
    </Box>
  );
};

export default Home;