import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, 
  Button, 
  TextField, 
  List, 
  ListItem, 
  ListItemText,
  IconButton,
  Alert,
  CircularProgress,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Footer = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackText, setFeedbackText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);
  const { user, isLoggedIn } = useSelector(state => state.auth);

  const fetchFeedbacks = useCallback(async () => {
    // Отменяем предыдущий запрос, если он есть
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      setLoading(true);
      const response = await fetch('http://localhost:3002/feedbacks?_sort=date&_order=desc', {
        signal: controller.signal
      });
      
      if (!response.ok) throw new Error('Ошибка загрузки отзывов');
      
      const data = await response.json();
      setFeedbacks(data);
      setError(null);
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Ошибка загрузки отзывов:', err);
        setError('Не удалось загрузить отзывы');
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isFeedbackOpen) return;
    
    const timer = setTimeout(() => {
      fetchFeedbacks();
    }, 100); // Небольшая задержка для предотвращения множественных запросов

    return () => {
      clearTimeout(timer);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [isFeedbackOpen]); // Убрал fetchFeedbacks из зависимостей

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLoggedIn || !user) {
      setError('Требуется авторизация');
      return;
    }

    if (!feedbackText.trim()) {
      setError('Отзыв не может быть пустым');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const response = await fetch('http://localhost:3002/feedbacks', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ 
          text: feedbackText,
          date: new Date().toISOString(),
          userId: user.id,
          userName: user.name
        }),
        signal: controller.signal
      });

      if (!response.ok) throw new Error('Ошибка отправки');
      
      const newFeedback = await response.json();
      setFeedbacks(prev => [newFeedback, ...prev]);
      setFeedbackText('');
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Ошибка:', err);
        setError(err.message || 'Ошибка при отправке отзыва');
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleDelete = async (id) => {
    if (user?.role !== 'admin') return;
    
    try {
      setLoading(true);
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const response = await fetch(`http://localhost:3002/feedbacks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
        signal: controller.signal
      });

      if (!response.ok) throw new Error('Ошибка удаления');
      
      setFeedbacks(prev => prev.filter(feedback => feedback.id !== id));
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Ошибка:', err);
        setError(err.message || 'Ошибка при удалении');
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
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
        borderTop: '1px solid #FFD700',
        zIndex: 1000
      }}
    >
      <Button
        variant="text"
        onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}
        sx={{ 
          color: '#FFD700',
          '&:hover': {
            backgroundColor: 'rgba(255, 215, 0, 0.1)'
          }
        }}
      >
        {isFeedbackOpen ? '▲ Скрыть отзывы' : '▼ Показать отзывы'}
      </Button>

      {isFeedbackOpen && (
        <Box
          sx={{
            maxHeight: '50vh',
            overflowY: 'auto',
            padding: '20px',
            backgroundColor: '#333',
            mt: 1,
            borderRadius: '4px'
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {isLoggedIn ? (
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                sx={{ 
                  mb: 2,
                  '& .MuiInputBase-root': {
                    color: '#FFF',
                    '& fieldset': { borderColor: '#FFD700' }
                  },
                  '& .MuiInputLabel-root': { color: '#FFD700' }
                }}
                label="Ваш отзыв"
                disabled={loading}
              />
              <Button 
                type="submit" 
                variant="contained"
                disabled={loading || !feedbackText.trim()}
                sx={{ 
                  bgcolor: '#FFD700', 
                  color: '#000',
                  '&:hover': { bgcolor: '#FFC107' },
                  mb: 2
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 'Отправить отзыв'}
              </Button>
            </Box>
          ) : (
            <Alert severity="info" sx={{ mb: 2 }}>
              Авторизуйтесь, чтобы оставить отзыв
            </Alert>
          )}

          {loading && feedbacks.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress sx={{ color: '#FFD700' }} />
            </Box>
          ) : (
            <List sx={{ mt: 2 }}>
              {feedbacks.map((feedback) => (
                <ListItem 
                  key={feedback.id} 
                  sx={{ 
                    color: '#FFF',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                  secondaryAction={
                    user?.role === 'admin' && (
                      <IconButton
                        edge="end"
                        onClick={() => handleDelete(feedback.id)}
                        sx={{ color: '#ff6666' }}
                        disabled={loading}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )
                  }
                >
                  <ListItemText
                    primary={feedback.text}
                    secondary={
                      feedback.userName 
                        ? `${feedback.userName}, ${new Date(feedback.date).toLocaleString()}`
                        : new Date(feedback.date).toLocaleString()
                    }
                    secondaryTypographyProps={{ 
                      color: '#FFD700',
                      sx: { fontSize: '0.8rem' }
                    }}
                    sx={{ wordBreak: 'break-word' }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      )}

      <Typography variant="body2" sx={{ mt: 1, color: '#FFD700' }}>
        © {new Date().getFullYear()} Мое React-приложение
      </Typography>
    </Box>
  );
};

export default React.memo(Footer);