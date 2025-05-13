import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText,
  IconButton,
  CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FeedbackList = () => {
  const { user, role } = useSelector(state => state.auth);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3002/feedbacks?_sort=date&_order=desc', {
          signal: controller.signal
        });
        
        if (!response.ok) throw new Error('Ошибка загрузки отзывов');
        
        const data = await response.json();
        setFeedbacks(data);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Ошибка загрузки:', err);
          setError('Не удалось загрузить отзывы');
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();

    return () => controller.abort();
  }, []); // Загружаем только при монтировании компонента

  const handleDelete = async (feedbackId) => {
    if (role !== 'admin') return;
    
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3002/feedbacks/${feedbackId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) throw new Error('Ошибка удаления');
      
      setFeedbacks(prev => prev.filter(feedback => feedback.id !== feedbackId));
    } catch (err) {
      console.error('Ошибка удаления:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      maxHeight: '400px', 
      overflowY: 'auto', 
      mt: 2,
      border: '1px solid #333',
      borderRadius: '4px',
      p: 2
    }}>
      <Typography variant="h6" sx={{ color: '#FFD700', mb: 1 }}>
        Отзывы пользователей
      </Typography>
      
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <CircularProgress sx={{ color: '#FFD700' }} />
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {!loading && feedbacks.length === 0 ? (
        <Typography sx={{ color: '#FFD700' }}>
          Пока нет отзывов
        </Typography>
      ) : (
        <List>
          {feedbacks.map((feedback) => (
            <ListItem 
              key={feedback.id}
              sx={{ 
                borderBottom: '1px solid #333',
                '&:last-child': { borderBottom: 'none' }
              }}
              secondaryAction={
                role === 'admin' && (
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
                secondary={`Автор: ${feedback.userName} • ${new Date(feedback.date).toLocaleString()}`}
                primaryTypographyProps={{ 
                  color: '#FFF',
                  sx: { wordBreak: 'break-word' }
                }}
                secondaryTypographyProps={{ 
                  color: '#FFD700',
                  sx: { fontSize: '0.8rem' }
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default FeedbackList;