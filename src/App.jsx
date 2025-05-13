import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Lab1 from './pages/Lab1';
import Lab2 from './pages/Lab2';
import Lab3 from './pages/Lab3';
import CounterPage from './pages/CounterPage';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NotFound from './components/NotFound';
import FeedbackPage from './pages/FeedbackPage';
import { ThemeProvider } from './context/ThemeContext';
import { Provider } from 'react-redux';
import store from './redux/store';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              {/* Главная страница */}
              <Route path="/" element={<Home />} />

              {/* Лабораторные работы */}
              <Route path="/lab1" element={<Lab1 />} />
              <Route path="/lab2" element={<Lab2 />} />
              <Route path="/lab3" element={<Lab3 />} />

              {/* Счётчик */}
              <Route path="/counter" element={<CounterPage />} />

              {/* Вход */}
              <Route path="/login" element={<Login />} />

              {/* Обратная связь */}
              <Route path="/feedback" element={<FeedbackPage />} />

              {/* Профиль (защищённый маршрут) */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />

              {/* Все остальные маршруты перенаправляются на главную страницу */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;