import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Tabs, 
  Tab, 
  Alert,
  Paper,
  CircularProgress
} from '@mui/material';
import { registrationStyles } from './RegistrationForm.styles';

const AuthForm = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    isBlocked: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const abortControllerRef = useRef(null);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Отменяем предыдущий запрос, если он есть
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      if (isLoginMode) {
        const response = await fetch(
          `http://localhost:3002/users?name=${encodeURIComponent(formData.name)}&password=${encodeURIComponent(formData.password)}`,
          { signal: controller.signal }
        );
        
        if (!response.ok) throw new Error('Ошибка сервера');
        
        const users = await response.json();
        if (users.length === 0) throw new Error('Неверное имя пользователя или пароль');
        
        const user = users[0];
        
        if (user.isBlocked) {
          throw new Error('Ваш аккаунт заблокирован. Обратитесь к администратору.');
        }
        
        const userWithAvatar = {
          ...user,
          avatarColor: user.role === 'admin' ? '#ff0000' : '#FFD700'
        };
        
        dispatch(login(userWithAvatar));
        setSuccess('Вход выполнен успешно!');
        navigate('/');
      } else {
        // Проверка имени и email параллельно
        const [nameCheck, emailCheck] = await Promise.all([
          fetch(`http://localhost:3002/users?name=${encodeURIComponent(formData.name)}`, { signal: controller.signal }),
          fetch(`http://localhost:3002/users?email=${encodeURIComponent(formData.email)}`, { signal: controller.signal })
        ]);
        
        if (!nameCheck.ok || !emailCheck.ok) throw new Error('Ошибка проверки данных');
        
        const [existingNames, existingEmails] = await Promise.all([
          nameCheck.json(),
          emailCheck.json()
        ]);
        
        if (existingNames.length > 0) throw new Error('Пользователь с таким именем уже существует');
        if (existingEmails.length > 0) throw new Error('Пользователь с таким email уже существует');
        if (formData.password.length < 6) throw new Error('Пароль должен содержать минимум 6 символов');

        const newUser = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'user',
          isBlocked: false,
          avatarColor: '#FFD700',
          createdAt: new Date().toISOString()
        };

        const createResponse = await fetch('http://localhost:3002/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
          signal: controller.signal
        });
        
        if (!createResponse.ok) throw new Error('Ошибка регистрации');
        
        const createdUser = await createResponse.json();
        dispatch(login(createdUser));
        setSuccess('Регистрация успешна!');
        
        // Используем setTimeout с очисткой
        const redirectTimer = setTimeout(() => {
          navigate('/');
        }, 1500);
        
        return () => clearTimeout(redirectTimer);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
      abortControllerRef.current = null;
    }
  };

  return (
    <Box sx={registrationStyles.container}>
      <Paper elevation={3} sx={registrationStyles.paper}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={isLoginMode ? 1 : 0} 
            onChange={(e, newValue) => {
              setIsLoginMode(newValue === 1);
              setError('');
              setSuccess('');
            }}
            centered
          >
            <Tab label="Регистрация" sx={{ color: '#FFD700', fontWeight: 'bold' }} disabled={loading} />
            <Tab label="Вход" sx={{ color: '#FFD700', fontWeight: 'bold' }} disabled={loading} />
          </Tabs>
        </Box>

        <Typography variant="h4" sx={registrationStyles.title}>
          {isLoginMode ? 'Вход в аккаунт' : 'Форма регистрации'}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <form onSubmit={handleSubmit} style={registrationStyles.form}>
          <TextField
            fullWidth
            label="Имя пользователя"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            sx={registrationStyles.textField}
            required
            disabled={loading}
          />

          {!isLoginMode && (
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              sx={registrationStyles.textField}
              required
              disabled={loading}
            />
          )}

          <TextField
            fullWidth
            label="Пароль"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            sx={registrationStyles.textField}
            required
            inputProps={{ minLength: 6 }}
            disabled={loading}
          />

          <Button 
            type="submit" 
            variant="contained" 
            sx={registrationStyles.button}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 
             isLoginMode ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AuthForm;