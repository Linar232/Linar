// src/components/Header.jsx
import React, { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import ProfileButton from './ProfileButton';
import useLoginState from '../hooks/useLoginState'; // Импортируем хук для проверки авторизации

const mainMenuItems = [
  { label: 'Главная', link: '/' },
];

const labMenuItems = [
  { label: 'Лабораторная 1', link: '/lab1' },
  { label: 'Лабораторная 2', link: '/lab2' },
  { label: 'Лабораторная 3', link: '/lab3' },
];

const Header = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const isLoggedIn = useLoginState(); // Проверяем статус авторизации

  const [anchorEl, setAnchorEl] = React.useState(null); // Состояние для выпадающего меню
  const open = Boolean(anchorEl);

  const handleLabMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLabMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#212121' }}>
      <Toolbar>
        {/* Выпадающее меню для лабораторных работ */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleLabMenuOpen}
          sx={{ mr: 2 }}
        >
          <Typography
            variant="h6"
            component="span"
            sx={{
              flexGrow: 0,
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1.25rem',
            }}
          >
            Лабораторные
          </Typography>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleLabMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {labMenuItems.map((item, index) => (
            <MenuItem
              key={index}
              component={Link}
              to={item.link}
              onClick={handleLabMenuClose}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>

        {/* Заголовок приложения */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: '#fff', fontWeight: 'bold', fontSize: '1.25rem' }}
        >
          Мое React-приложение
        </Typography>

        {/* Основные ссылки (только "Главная") */}
        {mainMenuItems.map((item, index) => (
          <Button key={index} component={Link} to={item.link} color="inherit" sx={{ ml: 2 }}>
            {item.label}
          </Button>
        ))}

        {/* Кнопка "Зарегистрироваться", доступная только для неавторизованных пользователей */}
        {!isLoggedIn && ( // Показываем кнопку только если пользователь НЕ авторизован
          <Button
            component={Link}
            to="/registration"
            color="inherit"
            sx={{ ml: 2 }}
          >
            Зарегистрироваться
          </Button>
        )}

        {/* Кнопка смены темы */}
        <IconButton onClick={toggleTheme} color="inherit">
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        {/* Кнопка профиля (доступна только для авторизованных пользователей) */}
        {isLoggedIn && <ProfileButton />} {/* Показываем кнопку профиля только если пользователь авторизован */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;