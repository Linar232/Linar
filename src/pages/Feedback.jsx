// src/pages/Feedback.jsx
import React, { useState, useCallback } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material'; // Импортируем компоненты Material-UI
import DeleteIcon from '@mui/icons-material/Delete'; // Иконка для удаления

// Компонент Feedback для сбора и отображения обратной связи
const Feedback = () => {
  // Состояния:
  const [feedbacks, setFeedbacks] = useState([]); // Массив для хранения отзывов
  const [name, setName] = useState(''); // Состояние для имени пользователя
  const [message, setMessage] = useState(''); // Состояние для сообщения пользователя
  const [error, setError] = useState(''); // Состояние для хранения ошибок валидации

  // Функция для обработки отправки формы
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault(); // Предотвращаем стандартное поведение формы

      // Валидация:
      if (!name || !message) {
        setError('Пожалуйста, заполните все поля'); // Ошибка, если поля пустые
        return;
      }
      if (message.length < 10) {
        setError('Сообщение должно содержать минимум 10 символов'); // Ошибка, если сообщение слишком короткое
        return;
      }

      // Добавляем новый отзыв в массив feedbacks
      setFeedbacks((prevFeedbacks) => [...prevFeedbacks, { id: Date.now(), name, message }]);

      // Очищаем поля ввода и ошибки
      setName('');
      setMessage('');
      setError('');
    },
    [name, message] // Зависимости для useCallback
  );

  // Функция для удаления отзыва
  const handleDelete = (id) => {
    setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((fb) => fb.id !== id)); // Удаляем отзыв по id
  };

  return (
    <Box
      sx={{
        padding: '20px', // Внутренние отступы
        backgroundColor: '#f9f9f9', // Цвет фона
        minHeight: 'calc(100vh - 64px)', // Минимальная высота контейнера
        textAlign: 'center', // Выравнивание текста по центру
      }}
    >
      {/* Заголовок компонента */}
      <Typography variant="h4">Обратная связь</Typography>

      {/* Форма для ввода отзыва */}
      <form onSubmit={handleSubmit}>
        {/* Поле для ввода имени */}
        <TextField
          fullWidth // Занимает всю доступную ширину
          label="Ваше имя" // Подпись поля
          margin="normal" // Отступы
          value={name} // Текущее значение
          onChange={(e) => setName(e.target.value)} // Обработчик изменения
          error={!!error} // Показываем ошибку, если она есть
          helperText={error} // Текст ошибки
        />

        {/* Поле для ввода сообщения */}
        <TextField
          fullWidth
          label="Сообщение"
          margin="normal"
          multiline // Многострочное поле
          rows={4} // Количество строк
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          error={!!error}
          helperText={error}
        />

        {/* Кнопка для отправки формы */}
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px' }}>
          Отправить
        </Button>
      </form>

      {/* Список отзывов */}
      <List sx={{ marginTop: '20px' }}>
        {feedbacks.map((fb) => (
          <ListItem key={fb.id}>
            {/* Отображение имени и сообщения */}
            <ListItemText primary={fb.name} secondary={fb.message} />

            {/* Кнопка для удаления отзыва */}
            <IconButton onClick={() => handleDelete(fb.id)} color="error">
              <DeleteIcon /> {/* Иконка удаления */}
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Feedback;