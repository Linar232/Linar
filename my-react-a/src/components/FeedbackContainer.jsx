// src/components/FeedbackContainer.jsx
import React, { useState, useCallback } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { useTheme } from '../hooks/useTheme'; // Используем кастомный хук для темы

const FeedbackContainer = () => {
  const { isDarkMode } = useTheme(); // Получаем состояние темы
  const [feedbacks, setFeedbacks] = useState([]); // Список отзывов
  const [feedbackText, setFeedbackText] = useState(''); // Текущий текст отзыва

  // Обработчик отправки отзыва
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (feedbackText.trim()) {
        setFeedbacks((prevFeedbacks) => [
          ...prevFeedbacks,
          { id: Date.now(), text: feedbackText },
        ]);
        setFeedbackText('');
      }
    },
    [feedbackText]
  );

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: isDarkMode ? '#121212' : '#f9f9f9', // Фон контейнера
        borderTop: '2px solid #ccc',
        padding: '20px',
        maxHeight: '50vh',
        overflowY: 'auto',
      }}
    >
      {/* Заголовок */}
      <Typography variant="h6" gutterBottom sx={{ color: isDarkMode ? '#FFD700' : '#673ab7' }}>
        Оставить свой отзыв
      </Typography>

      {/* Верхняя часть: форма для написания отзыва */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '20px',
          width: '100%',
        }}
      >
        <TextField
          fullWidth
          label="Ваш отзыв"
          multiline
          rows={4}
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderColor: isDarkMode ? '#888' : '#ccc', // Цвет границы поля ввода
            },
            '& .MuiInputLabel-root': {
              color: isDarkMode ? '#aaa' : '#000', // Цвет надписи "Ваш отзыв"
            },
            '& .MuiOutlinedInput-input': {
              color: isDarkMode ? '#fff' : '#000', // Цвет текста внутри поля
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            marginTop: '10px',
            backgroundColor: isDarkMode ? '#FFD700' : '#673ab7', // Цвет кнопки
            color: isDarkMode ? '#000' : '#fff', // Цвет текста кнопки
            '&:hover': {
              backgroundColor: isDarkMode ? '#FFC107' : '#5c2da7', // Цвет при наведении
            },
          }}
        >
          Отправить отзыв
        </Button>
      </Box>

      {/* Нижняя часть: список отзывов */}
      <Box
        sx={{
          width: '100%',
          marginTop: '20px',
          borderTop: '1px solid #ddd',
          paddingTop: '10px',
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: isDarkMode ? '#FFD700' : '#673ab7' }}>
          Отзывы пользователей:
        </Typography>
        <List>
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <ListItem key={feedback.id}>
                <ListItemText
                  primary={feedback.text}
                  secondary={new Date(feedback.id).toLocaleString()}
                  sx={{
                    color: isDarkMode ? '#fff' : '#000', // Цвет текста отзывов
                  }}
                />
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" sx={{ color: isDarkMode ? '#aaa' : '#888' }}>
              Нет отзывов
            </Typography>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default FeedbackContainer;