import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/authSlice';
import { Box, Typography, TextField, Button, Tabs, Tab } from '@mui/material';
import axios from 'axios';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/users/${user.id}`, formData);
      dispatch(updateUser(response.data));
      alert('Профиль успешно обновлен!');
    } catch (error) {
      alert('Ошибка при обновлении профиля');
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        Профиль пользователя
      </Typography>

      <Tabs value={tabValue} onChange={(e, val) => setTabValue(val)} centered>
        <Tab label="Информация" />
        <Tab label="Редактирование" />
      </Tabs>

      {tabValue === 0 && (
        <Box sx={{ p: 3 }}>
          <Typography><strong>Имя:</strong> {user?.name}</Typography>
          <Typography><strong>Email:</strong> {user?.email}</Typography>
          <Typography><strong>Роль:</strong> {user?.role}</Typography>
        </Box>
      )}

      {tabValue === 1 && (
        <Box component="form" onSubmit={handleUpdate} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Имя"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Новый пароль"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained">
            Сохранить изменения
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Profile;