// src/components/RegistrationForm.jsx
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form'; // Библиотека для управления формами
import { useDispatch } from 'react-redux'; // Хук для отправки действий в Redux
import { login } from '../redux/authSlice'; // Действие для авторизации
import { Box, Typography, TextField, Button } from '@mui/material'; // Компоненты Material-UI
import { registrationStyles } from './RegistrationForm.styles'; // Стили для формы

// Компонент RegistrationForm для регистрации пользователя
const RegistrationForm = () => {
  // Используем useForm для управления формой
  const {
    register, // Регистрируем поля формы
    handleSubmit, // Обработчик отправки формы
    formState: { errors }, // Ошибки валидации
  } = useForm();

  const dispatch = useDispatch(); // Хук для отправки действий в Redux

  // Обработчик отправки формы
  const onSubmit = (data) => {
    // Сохраняем данные пользователя в localStorage
    localStorage.setItem('userData', JSON.stringify(data));
    // Показываем сообщение об успешной регистрации
    alert(`Регистрация успешна!\nДанные:\n${JSON.stringify(data, null, 2)}`);
    // Отправляем действие login в Redux для авторизации пользователя
    dispatch(login());
  };

  // useEffect для показа сообщений при загрузке и закрытии формы
  useEffect(() => {
    alert('Форма регистрации загружена!'); // Сообщение при загрузке формы
    return () => alert('Форма регистрации закрыта!'); // Сообщение при закрытии формы
  }, []);

  return (
    <Box sx={registrationStyles.container}>
      {/* Заголовок формы */}
      <Typography variant="h4" gutterBottom sx={registrationStyles.title}>
        Форма регистрации
      </Typography>

      {/* Форма для регистрации */}
      <form onSubmit={handleSubmit(onSubmit)} style={registrationStyles.form}>
        {/* Поле для ввода имени */}
        <TextField
          fullWidth
          label="Имя"
          margin="normal"
          {...register('name', { required: 'Поле обязательно для заполнения' })} // Валидация: поле обязательно
          error={!!errors.name} // Показываем ошибку, если поле не заполнено
          helperText={errors.name?.message} // Текст ошибки
          sx={registrationStyles.textField} // Стили для текстового поля
        />

        {/* Поле для ввода email */}
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          {...register('email', {
            required: 'Поле обязательно для заполнения', // Валидация: поле обязательно
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // Регулярное выражение для email
              message: 'Некорректный email', // Сообщение об ошибке
            },
          })}
          error={!!errors.email} // Показываем ошибку, если email некорректен
          helperText={errors.email?.message} // Текст ошибки
          sx={registrationStyles.textField} // Стили для текстового поля
        />

        {/* Поле для ввода пароля */}
        <TextField
          fullWidth
          label="Пароль"
          type="password" // Тип поля — пароль
          margin="normal"
          {...register('password', {
            required: 'Поле обязательно для заполнения', // Валидация: поле обязательно
            minLength: {
              value: 6, // Минимальная длина пароля
              message: 'Пароль должен содержать минимум 6 символов', // Сообщение об ошибке
            },
          })}
          error={!!errors.password} // Показываем ошибку, если пароль слишком короткий
          helperText={errors.password?.message} // Текст ошибки
          sx={registrationStyles.textField} // Стили для текстового поля
        />

        {/* Кнопка для отправки формы */}
        <Button type="submit" variant="contained" sx={registrationStyles.button}>
          Зарегистрироваться
        </Button>
      </form>
    </Box>
  );
};

export default RegistrationForm;