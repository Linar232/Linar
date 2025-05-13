import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText,
  IconButton,
  Alert,
  CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetFeedbacksQuery, useAddFeedbackMutation, useDeleteFeedbackMutation } from '../redux/feedbackApi';

const FeedbackContainer = () => {
  const { user, isLoggedIn } = useSelector(state => state.auth);
  const [feedbackText, setFeedbackText] = useState('');
  
  // Используем RTK Query хуки
  const { 
    data: feedbacks = [], 
    isLoading, 
    isError, 
    isFetching,
    error: fetchError 
  } = useGetFeedbacksQuery();
  
  const [addFeedback, { isLoading: isAdding }] = useAddFeedbackMutation();
  const [deleteFeedback, { isLoading: isDeleting }] = useDeleteFeedbackMutation();

  // Обработчик удаления отзыва
  const handleDelete = async (id) => {
    if (user?.role !== 'admin') return;
    try {
      await deleteFeedback(id);
    } catch (err) {
      console.error('Failed to delete feedback:', err);
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackText.trim() || !user) return;

    try {
      await addFeedback({
        text: feedbackText,
        date: new Date().toISOString(),
        userId: user.id,
        userName: user.name
      });
      setFeedbackText('');
    } catch (err) {
      console.error('Failed to add feedback:', err);
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#121212', minHeight: '100vh' }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#FFD700' }}>
        Отзывы пользователей
      </Typography>

      {/* Форма ввода отображается только для авторизованных */}
      {isLoggedIn && (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            label="Ваш отзыв"
            disabled={isAdding}
            sx={{ 
              '& .MuiInputBase-root': { color: '#FFD700' },
              '& .MuiInputLabel-root': { color: '#FFD700' }
            }}
          />
          <Button 
            type="submit" 
            variant="contained"
            disabled={isAdding || !feedbackText.trim()}
            sx={{ 
              mt: 2,
              bgcolor: '#FFD700', 
              color: '#000',
              '&:hover': { bgcolor: '#FFC107' }
            }}
          >
            {isAdding ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 'Отправить отзыв'}
          </Button>
        </Box>
      )}

      {/* Сообщения об ошибках */}
      {isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Ошибка загрузки отзывов: {fetchError?.data?.message || fetchError?.message}
        </Alert>
      )}

      {/* Индикатор загрузки */}
      {(isLoading || isFetching) && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress sx={{ color: '#FFD700' }} />
        </Box>
      )}

      {/* Список отзывов */}
      {!isLoading && !isError && (
        <List sx={{ 
          '& .MuiListItem-root': { 
            borderBottom: '1px solid #333',
            '&:last-child': { borderBottom: 'none' }
          }
        }}>
          {feedbacks.map((feedback) => (
            <ListItem 
              key={feedback.id}
              sx={{ color: '#FFF' }}
              secondaryAction={
                user?.role === 'admin' && (
                  <IconButton 
                    edge="end" 
                    onClick={() => handleDelete(feedback.id)}
                    sx={{ color: '#ff6666' }}
                    disabled={isDeleting}
                  >
                    {isDeleting ? <CircularProgress size={24} /> : <DeleteIcon />}
                  </IconButton>
                )
              }
            >
              <ListItemText
                primary={feedback.text}
                primaryTypographyProps={{ color: '#FFF' }}
                secondary={
                  feedback.userName 
                    ? `${feedback.userName}, ${new Date(feedback.date).toLocaleString()}`
                    : new Date(feedback.date).toLocaleString()
                }
                secondaryTypographyProps={{ color: '#FFD700' }}
              />
            </ListItem>
          ))}
        </List>
      )}

      {!isLoading && !isError && feedbacks.length === 0 && (
        <Typography sx={{ color: '#FFD700' }}>Пока нет отзывов</Typography>
      )}
    </Box>
  );
};

export default FeedbackContainer;