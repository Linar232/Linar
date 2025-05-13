import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const NotFound = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      alert('Страница не найдена! Вы будете перенаправлены на главную страницу.');
    }, 1000); // Показываем alert через 1 секунду

    const redirectTimer = setTimeout(() => {
      window.location.href = '/'; // Редирект на главную страницу через 3 секунды
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" color="error">
        404 - Страница не найдена
      </Typography>
      <Typography variant="body1" sx={{ marginTop: '10px' }}>
        Вы будете автоматически перенаправлены на главную страницу через 3 секунды.
      </Typography>
    </Box>
  );
};

export default NotFound;