// src/pages/CounterPage.jsx
import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const CounterPage = () => {
  // Используем useState для создания локального состояния счетчика
  const [count, setCount] = useState(0);

  // Функция для увеличения значения счетчика
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // Функция для уменьшения значения счетчика
  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#f9f9f9',
        minHeight: 'calc(100vh - 64px)',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4">Счетчик</Typography>
      <Typography variant="h1">{count}</Typography>
      <Button onClick={handleIncrement} variant="contained" color="primary" sx={{ margin: '10px' }}>
        Увеличить
      </Button>
      <Button onClick={handleDecrement} variant="contained" color="secondary" sx={{ margin: '10px' }}>
        Уменьшить
      </Button>
    </Box>
  );
};

export default CounterPage;