// src/hooks/useTheme.js
import { useContext } from 'react'; // Хук для работы с контекстом
import { ThemeContext } from '../context/ThemeContext'; // Импортируем контекст темы

// Кастомный хук useTheme для доступа к контексту темы
export const useTheme = () => {
  // Используем useContext для получения значений из ThemeContext
  return useContext(ThemeContext);
};