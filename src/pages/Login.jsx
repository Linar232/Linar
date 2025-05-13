import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Box, 
  TextField, 
  Button, 
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:3001/users?email=${formData.email}&password=${formData.password}`
      );
      
      if (response.data.length === 0) {
        throw new Error('Неверные учетные данные');
      }

      const user = response.data[0];
      
      // Проверка на блокировку аккаунта
      if (user.isBlocked) {
        throw new Error('Ваш аккаунт заблокирован. Обратитесь к администратору.');
      }

      dispatch(login(user));
      navigate('/profile');
      
    } catch (error) {
      setError(error.message || 'Ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      maxWidth: 400, 
      mx: 'auto', 
      p: 3,
      mt: 4,
      boxShadow: 3,
      borderRadius: 2,
      backgroundColor: 'background.paper'
    }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        Вход в систему
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          sx={{ mb: 2 }}
          required
          disabled={loading}
        />
        
        <TextField
          fullWidth
          label="Пароль"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          sx={{ mb: 3 }}
          required
          disabled={loading}
        />
        
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth
          disabled={loading}
          sx={{ py: 1.5 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Войти'}
        </Button>
      </Box>
    </Box>
  );
};

export default Login;