// src/hooks/useLoginState.js
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Хук для доступа к состоянию Redux

// Кастомный хук useLoginState для синхронизации состояния авторизации с localStorage
const useLoginState = () => {
  // Получаем состояние авторизации из Redux
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // При монтировании компонента загружаем состояние авторизации из localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('isLoggedIn'); // Получаем сохраненное состояние
    if (savedState !== null) {
      return JSON.parse(savedState); // Возвращаем сохраненное состояние (не используется)
    }
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только при монтировании

  // При изменении состояния авторизации сохраняем его в localStorage
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn)); // Сохраняем текущее состояние
  }, [isLoggedIn]); // Эффект выполняется при изменении isLoggedIn

  // Возвращаем текущее состояние авторизации
  return isLoggedIn;
};

export default useLoginState;