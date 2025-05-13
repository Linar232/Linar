import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Footer = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const { isLoggedIn } = useSelector(state => state.auth);

  return (
    <Box
      sx={{
        padding: '10px',
        backgroundColor: '#212121',
        color: '#fff',
        textAlign: 'center',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #FFD700',
        zIndex: 1000
      }}
    >
      {/* Окно */}
      {isFeedbackOpen && (
        <Box
          sx={{
            maxHeight: '50vh',
            overflowY: 'auto',
            padding: '20px',
            backgroundColor: '#333',
            mt: 1,
            borderRadius: '4px'
          }}
        >
          {/* Здесь можно добавить любое содержимое или оставить пустым */}
          {!isLoggedIn && (
            <Typography variant="body1" sx={{ color: '#FFD700' }}>
              Авторизуйтесь для доступа к дополнительным функциям.
            </Typography>
          )}
        </Box>
      )}

      {/* Нижний текст */}
      <Typography variant="body2" sx={{ mt: 1, color: '#FFD700' }}>
        © {new Date().getFullYear()} Мое React-приложение
      </Typography>
    </Box>
  );
};

export default React.memo(Footer);