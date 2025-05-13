import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    // Таймер обратного отсчета
    const countdownInterval = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    // Таймер для редиректа
    const redirectTimer = setTimeout(() => {
      setRedirecting(true);
      navigate('/', { replace: true });
    }, 3000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  const handleManualRedirect = () => {
    if (!redirecting) {
      setRedirecting(true);
      navigate('/', { replace: true });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#121212',
        color: '#FFD700',
        textAlign: 'center',
        p: 3
      }}
    >
      <Typography variant="h1" sx={{ mb: 2 }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Страница не найдена
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        {`Вы будете автоматически перенаправлены на главную страницу через ${countdown} секунд...`}
      </Typography>
      <Button 
        variant="contained" 
        onClick={handleManualRedirect}
        disabled={redirecting}
        sx={{ 
          bgcolor: '#FFD700',
          color: '#000',
          '&:hover': { bgcolor: '#FFC107' },
          '&:disabled': { opacity: 0.7 }
        }}
      >
        {redirecting ? 'Перенаправление...' : 'Вернуться на главную'}
      </Button>
    </Box>
  );
};

export default React.memo(NotFound);