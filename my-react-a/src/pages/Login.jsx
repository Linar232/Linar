// src/pages/Login.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Если пользователь уже авторизован, перенаправляем его на главную страницу
  if (isLoggedIn) {
    navigate('/');
  }

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#000',
        minHeight: 'calc(100vh - 64px)',
        color: '#FFD700',
        textAlign: 'center',
      }}
    >
      <TextField
        fullWidth
        label="Пароль"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleLogin} sx={{ marginTop: '20px' }}>
        Войти
      </Button>
    </Box>
  );
};

export default Login;