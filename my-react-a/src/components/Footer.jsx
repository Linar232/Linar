// src/components/Footer.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const Footer = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false); // Состояние для открытия формы отзывов
  const [feedbacks, setFeedbacks] = useState([]); // Список отзывов
  const [feedbackText, setFeedbackText] = useState(''); // Текущий текст отзыва

  // Обработка отправки отзыва
  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedbackText.trim()) {
      setFeedbacks((prevFeedbacks) => [
        ...prevFeedbacks,
        { id: Date.now(), text: feedbackText },
      ]);
      setFeedbackText('');
      // Не закрываем окно после отправки отзыва
    }
  };

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
      }}
    >
      {/* Кнопка для открытия формы отзывов */}
      <Button
        variant="text"
        onClick={() => setIsFeedbackOpen(true)} // Открываем форму при клике
        sx={{ color: '#FFD700', textDecoration: 'underline', cursor: 'pointer' }}
      >
        Оставить отзыв
      </Button>

      {/* Надпись в футере */}
      <Typography variant="body2" sx={{ mt: 1 }}>
        &copy; {new Date().getFullYear()} Мое React-приложение. Все права защищены.
      </Typography>

      {/* Модальное окно с формой отзывов */}
      {isFeedbackOpen && (
        <Paper
          elevation={3}
          sx={{
            marginTop: '10px',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            color: '#000',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          {/* Форма для отправки отзыва */}
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
              Оставьте свой отзыв
            </Typography>
            <TextField
              fullWidth
              label="Ваш отзыв"
              multiline
              rows={4}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              margin="normal"
              sx={{ maxWidth: '100%' }}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Отправить отзыв
            </Button>
          </form>

          {/* Список отзывов */}
          <Box sx={{ mt: 4 }}>
            <List>
              {feedbacks.length > 0 ? (
                feedbacks.map((feedback) => (
                  <ListItem key={feedback.id}>
                    <ListItemText primary={feedback.text} />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body1" sx={{ color: '#888' }}>
                  Нет отзывов
                </Typography>
              )}
            </List>
          </Box>

          {/* Кнопка для закрытия окна */}
          <Button
            variant="text"
            onClick={() => setIsFeedbackOpen(false)} // Закрываем окно по клику
            sx={{ mt: 2, color: '#FFD700' }}
          >
            Закрыть
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default Footer;