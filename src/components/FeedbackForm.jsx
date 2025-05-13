import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  TextField, 
  Button, 
  Box, 
  Typography,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FeedbackForm = ({ onSubmit }) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [error, setError] = useState('');
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (!feedbackText.trim()) {
      setError('Отзыв не может быть пустым');
      return;
    }

    onSubmit({
      text: feedbackText,
      userId: user.id,
      userName: user.username
    });
    setFeedbackText('');
    setError('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Ваш отзыв"
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        disabled={!isLoggedIn}
        placeholder={isLoggedIn ? "Оставьте ваш отзыв..." : "Авторизуйтесь, чтобы оставить отзыв"}
      />
      
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        disabled={!isLoggedIn}
      >
        {isLoggedIn ? "Отправить отзыв" : "Требуется авторизация"}
      </Button>
    </Box>
  );
};

export default FeedbackForm;