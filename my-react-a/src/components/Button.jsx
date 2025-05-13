import React from 'react';
import { Button as MuiButton } from '@mui/material';

// Определяем функциональный компонент Button.
// Он принимает два пропса: text (текст на кнопке) и onClick (функция, вызываемая при клике).
const Button = ({ text, onClick }) => {
  // Возвращаем JSX-элемент, представляющий кнопку.
  return (
    <MuiButton
      variant="contained" // Устанавливаем стиль кнопки как "contained" (заполненный фоновый цвет).
      color="secondary" // Устанавливаем цвет кнопки как "secondary" (вторичный цвет темы).
      onClick={onClick} // Передаём функцию onClick, которая будет вызвана при нажатии на кнопку.
      sx={{ margin: '10px' }} // Добавляем стили через объект sx. Здесь устанавливаем отступ (margin) в 10px.
    >
      {/* Отображаем текст, переданный через пропс text */}
      {text}
    </MuiButton>
  );
};

// Экспортируем компонент Button как-default, чтобы его можно было использовать в других частях приложения.
export default Button;