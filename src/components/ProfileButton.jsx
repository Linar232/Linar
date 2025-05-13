import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { 
  IconButton, 
  Menu, 
  MenuItem, 
  Typography, 
  Avatar,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfileButton = ({ onClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (onClick) onClick();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate('/'); // Перенаправляем на главную
  };

  if (!user) return null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="body1" sx={{ mr: 1, color: '#FFD700' }}>
        {user.name}
      </Typography>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar 
          sx={{ 
            width: 32, 
            height: 32, 
            bgcolor: user.avatarColor || '#FFD700',
            color: '#000',
            fontWeight: 'bold'
          }}
        >
          {user.name.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            bgcolor: '#121212',
            color: '#FFD700'
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate('/profile')}>
          <Typography>Профиль</Typography>
        </MenuItem>
        {user.role === 'admin' && (
          <MenuItem onClick={() => navigate('/admin')}>
            <Typography>Админ-панель</Typography>
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout}>
          <Typography color="error">Выйти</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileButton;