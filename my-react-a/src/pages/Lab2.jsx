import React from 'react';
import { Box, Typography } from '@mui/material';

const Lab2 = () => {
  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#1e1e1e',
        minHeight: 'calc(100vh - 64px)',
        color: '#fff',
      }}
    >
      <Typography variant="h4">Лабораторная работа 2</Typography>
      <Typography variant="body1">Здесь будет описание второй лабораторной работы.</Typography>
    </Box>
  );
};

export default Lab2;