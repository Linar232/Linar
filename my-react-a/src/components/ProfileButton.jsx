// src/components/ProfileButton.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProfileButton = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    dispatch(logout()); // Вызываем действие logout
    setAnchorEl(null); // Закрываем меню
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!isLoggedIn) return null; // Если пользователь не авторизован, ничего не показываем

  const userData = JSON.parse(localStorage.getItem('userData')) || {};

  return (
    <div>
      <IconButton
        onClick={handleClick}
        color="inherit"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '200px',
          },
        }}
      >
        <MenuItem>
          <Typography variant="body1">Привет, {userData.name || 'Пользователь'}!</Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body2">{userData.email || 'Email не указан'}</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography variant="body1" color="error">
            Выйти
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileButton;