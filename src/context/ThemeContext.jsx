// src/context/ThemeContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// Создаем контекст для управления темой
export const ThemeContext = createContext();

// Компонент ThemeProvider, который предоставляет тему для всего приложения
export const ThemeProvider = ({ children }) => {
  // Состояние для хранения текущей темы (тёмная или светлая)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // При инициализации загружаем сохраненное состояние из localStorage
    const savedMode = localStorage.getItem('isDarkMode');
    return savedMode ? JSON.parse(savedMode) : false; // Если сохраненное состояние есть, используем его, иначе — светлая тема
  });

  // Функция для переключения темы
  const toggleTheme = () => {
    const newMode = !isDarkMode; // Инвертируем текущее состояние темы
    setIsDarkMode(newMode); // Обновляем состояние
    localStorage.setItem('isDarkMode', JSON.stringify(newMode)); // Сохраняем новое состояние в localStorage
  };

  // Стили для темы
  const themeStyles = {
    backgroundColor: isDarkMode ? '#121212' : '#fff', // Фон: тёмный или светлый
    color: isDarkMode ? '#fff' : '#000', // Цвет текста: белый или чёрный
    transition: 'all 0.3s ease', // Плавный переход при изменении темы
  };

  // Возвращаем провайдер контекста с текущей темой и функцией для её переключения
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {/* Применяем стили темы ко всему содержимому */}
      <div style={themeStyles}>{children}</div>
    </ThemeContext.Provider>
  );
};