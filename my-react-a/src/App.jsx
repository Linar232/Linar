// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Lab1 from './pages/Lab1';
import Lab2 from './pages/Lab2';
import Lab3 from './pages/Lab3';
import CounterPage from './pages/CounterPage';
import RegistrationForm from './components/RegistrationForm';
import Profile from './pages/Profile';
import NotFound from './components/NotFound';
import Login from './pages/Login';
import useLoginState from './hooks/useLoginState';

const App = () => {
  const isLoggedIn = useLoginState();

  return (
    <>
      <Header />
      <Routes>
        {/* Публичные маршруты (доступны всем) */}
        <Route path="/" element={<Home />} />
        <Route path="/lab1" element={<Lab1 />} />
        <Route path="/lab2" element={<Lab2 />} />
        <Route path="/lab3" element={<Lab3 />} />
        <Route path="/counter" element={<CounterPage />} />
        <Route path="/registration" element={<RegistrationForm />} />

        {/* Приватные маршруты (только для авторизованных пользователей) */}
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login />} />
        
        {/* Страница входа */}
        <Route path="/login" element={<Login />} />

        {/* Обработка ошибок */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;