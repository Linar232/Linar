// src/pages/Lab1.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../redux/counterSlice';

const Lab1 = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#1e1e1e',
        minHeight: 'calc(100vh - 64px)',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      {/* Счётчик */}
      <Typography variant="h4">Счётчик</Typography>
      <Typography variant="h1">{count}</Typography>
      <Button
        variant="contained"
        onClick={() => dispatch(increment())}
        sx={{ mr: 2 }}
      >
        Увеличить
      </Button>
      <Button variant="contained" onClick={() => dispatch(decrement())}>
        Уменьшить
      </Button>

      {/* Описание лабораторной работы */}
      <Typography variant="body1" sx={{ marginTop: '40px' }}>
        Здесь будет описание первой лабораторной работы.
      </Typography>
    </Box>
  );
};

export default Lab1;