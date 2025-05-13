// src/pages/Profile.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const userData = JSON.parse(localStorage.getItem('userData')) || {};

  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#1e1e1e',
        minHeight: 'calc(100vh - 64px)',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4">Профиль пользователя</Typography>
      <Typography variant="body1">Имя: {userData.name || 'Не указано'}</Typography>
      <Typography variant="body1">Email: {userData.email || 'Не указан'}</Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ marginTop: '20px' }}>
        Выйти
      </Button>
    </Box>
  );
};

export default Profile;