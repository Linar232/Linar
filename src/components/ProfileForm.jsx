import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';

const ProfileForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else if (user) {
      reset({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [isLoggedIn, navigate, user, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      // Подготовка данных для отправки
      const updateData = {
        name: data.name,
        email: data.email,
        ...(data.password && { password: data.password })
      };

      console.log('Отправка данных:', { 
        userId: user.id, 
        updateData 
      });

      const response = await fetch(`http://localhost:3002/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      console.log('Ответ сервера:', response);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Ошибка сервера');
      }

      const updatedUser = await response.json();
      console.log('Обновленные данные:', updatedUser);

      dispatch(updateUser(updatedUser));
      setSuccess('Профиль успешно обновлен!');
      reset({ ...data, password: '' });
    } catch (err) {
      console.error('Ошибка обновления:', err);
      setError(err.message || 'Не удалось обновить профиль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      maxWidth: 500,
      mx: 'auto',
      p: 3,
      boxShadow: 3,
      borderRadius: 2,
      backgroundColor: 'background.paper'
    }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        Редактирование профиля
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Имя"
          {...register('name', { 
            required: 'Обязательное поле',
            minLength: {
              value: 2,
              message: 'Минимум 2 символа'
            }
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{ mb: 2 }}
          disabled={loading}
        />

        <TextField
          fullWidth
          label="Email"
          type="email"
          {...register('email', { 
            required: 'Обязательное поле',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Некорректный email'
            }
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ mb: 2 }}
          disabled={loading}
        />

        <TextField
          fullWidth
          label="Новый пароль"
          type="password"
          {...register('password', {
            minLength: {
              value: 6,
              message: 'Минимум 6 символов'
            }
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{ mb: 3 }}
          placeholder="Оставьте пустым, если не хотите менять"
          disabled={loading}
        />

        <Button 
          type="submit" 
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ 
            py: 1.5,
            bgcolor: '#FFD700',
            color: '#000',
            '&:hover': {
              bgcolor: '#FFC107'
            }
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 'Сохранить изменения'}
        </Button>
      </form>
    </Box>
  );
};

export default ProfileForm;