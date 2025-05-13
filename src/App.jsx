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
import RegistrationForm from './components/RegistrationForm';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import NotFound from './components/NotFound';
import FeedbackPage from './pages/FeedbackPage';
import { ThemeProvider } from './context/ThemeContext';
import { Provider } from 'react-redux';
import store from './redux/store';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

const AdminRoute = ({ children }) => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  return isLoggedIn && user?.role === 'admin' ? children : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lab1" element={<Lab1 />} />
              <Route path="/lab2" element={<Lab2 />} />
              <Route path="/lab3" element={<Lab3 />} />
              <Route path="/counter" element={<CounterPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<RegistrationForm />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;