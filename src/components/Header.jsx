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
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import ProfileButton from './ProfileButton';
import { useSelector } from 'react-redux';

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
  const { isLoggedIn } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
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

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: '#fff', fontWeight: 'bold', fontSize: '1.25rem' }}
        >
          Мое React-приложение
        </Typography>
        
        {isLoggedIn && <ProfileButton onClick={() => navigate('/profile')} />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;