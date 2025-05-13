import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ text, onClick, disabled = false }) => {
  return (
    <MuiButton
      variant="contained"
      color="secondary"
      onClick={onClick}
      disabled={disabled} // Передаем свойство disabled
      sx={{
        margin: '10px',
        backgroundColor: '#FFD700',
        color: '#000',
        '&:hover': {
          backgroundColor: '#FFC107',
        },
      }}
    >
      {text}
    </MuiButton>
  );
};

export default Button;