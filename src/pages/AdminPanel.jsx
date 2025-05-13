import React, { useState, useEffect, useMemo } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton, Switch, 
  Button, Alert, CircularProgress, Snackbar, Alert as MuiAlert } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [columns, setColumns] = useState([
    { id: 'id', label: 'ID', width: 100 },
    { id: 'name', label: 'Имя', width: 150 },
    { id: 'email', label: 'Email', width: 200 },
    { id: 'role', label: 'Роль', width: 120 },
    { id: 'isBlocked', label: 'Статус', width: 120 },
    { id: 'actions', label: 'Действия', width: 150 },
  ]);
  const { user: currentUser } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 90) {
          clearInterval(interval);
          return 90;
        }
        return newProgress;
      });
    }, 100);
    return interval;
  };

  useEffect(() => {
    if (currentUser?.role !== 'admin') {
      navigate('/');
      return;
    }

    const controller = new AbortController();
    const progressInterval = simulateProgress();
    setIsLoading(true);
    setIsFetching(true);

    const loadUsers = async () => {
      try {
        const response = await fetch('http://localhost:3002/users', {
          signal: controller.signal
        });
        
        if (!response.ok) {
          throw new Error(response.status === 500 ? 'Ошибка сервера' : 'Ошибка загрузки пользователей');
        }
        
        const data = await response.json();
        setUsers(data);
        setIsError(false);
        setError('');
        setIsFetching(false);
        setProgress(100);
        setTimeout(() => setIsLoading(false), 300);
        setSuccessMessage('Данные успешно загружены');
      } catch (err) {
        if (err.name !== 'AbortError') {
          setIsError(true);
          setError(err.message.includes('Failed to fetch') ? 'Сервер недоступен' : err.message);
          setIsFetching(false);
          setIsLoading(false);
        }
      } finally {
        clearInterval(progressInterval);
      }
    };

    loadUsers();
    return () => {
      controller.abort();
      clearInterval(progressInterval);
    };
  }, [currentUser?.role, navigate]);

  // Остальные функции остаются без изменений
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newColumns = Array.from(columns);
    const [removed] = newColumns.splice(result.source.index, 1);
    newColumns.splice(result.destination.index, 0, removed);
    setColumns(newColumns);
  };

  const handleToggleBlock = async (userId, currentStatus) => {
    try {
      setIsLoading(true);
      setIsFetching(true);
      setProgress(0);
      const progressInterval = simulateProgress();
      const response = await fetch(`http://localhost:3002/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isBlocked: !currentStatus })
      });
      if (!response.ok) throw new Error('Ошибка обновления статуса');
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, isBlocked: !currentStatus } : user
        )
      );
      setIsError(false);
      setProgress(100);
      setSuccessMessage('Статус пользователя успешно обновлен');
    } catch (err) {
      setIsError(true);
      setError(err.message.includes('Failed to fetch') ? 'Сервер недоступен' : err.message);
    } finally {
      setIsFetching(false);
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      try {
        setIsLoading(true);
        setIsFetching(true);
        setProgress(0);
        const progressInterval = simulateProgress();
        const response = await fetch(`http://localhost:3002/users/${userId}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Ошибка удаления');
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        setIsError(false);
        setProgress(100);
        setSuccessMessage('Пользователь успешно удален');
      } catch (err) {
        setIsError(true);
        setError(err.message.includes('Failed to fetch') ? 'Сервер недоступен' : err.message);
      } finally {
        setIsFetching(false);
        setTimeout(() => setIsLoading(false), 300);
      }
    }
  };

  const handleRefresh = async () => {
    const controller = new AbortController();
    const progressInterval = simulateProgress();
    setIsLoading(true);
    setIsFetching(true);
    try {
      const response = await fetch('http://localhost:3002/users', {
        signal: controller.signal
      });
      if (!response.ok) throw new Error(response.status === 500 ? 'Ошибка сервера' : 'Ошибка загрузки пользователей');
      const data = await response.json();
      setUsers(data);
      setIsError(false);
      setError('');
      setIsFetching(false);
      setProgress(100);
      setTimeout(() => setIsLoading(false), 300);
      setSuccessMessage('Список пользователей успешно обновлен');
    } catch (err) {
      if (err.name !== 'AbortError') {
        setIsError(true);
        setError(err.message.includes('Failed to fetch') ? 'Сервер недоступен' : err.message);
        setIsFetching(false);
        setIsLoading(false);
      }
    } finally {
      clearInterval(progressInterval);
    }
  };

  const handleCloseError = () => {
    setIsError(false);
    setError('');
  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessage('');
  };

  const tableHeader = useMemo(() => (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="columns" direction="horizontal">
        {(provided) => (
          <TableHead ref={provided.innerRef} {...provided.droppableProps}>
            <TableRow>
              {columns.map((column, index) => (
                <Draggable key={column.id} draggableId={column.id} index={index}>
                  {(provided) => (
                    <TableCell
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        color: '#FFD700',
                        backgroundColor: '#333',
                        minWidth: column.width,
                        ...provided.draggableProps.style
                      }}
                    >
                      {column.label}
                    </TableCell>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </TableRow>
          </TableHead>
        )}
      </Droppable>
    </DragDropContext>
  ), [columns]);

  if (currentUser?.role !== 'admin') {
    return null;
  }

  return (
    <Box sx={{ 
      p: 3, 
      backgroundColor: '#121212', 
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* Спиннер загрузки */}
      {(isLoading || isFetching) && (
        <Box sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999
        }}>
          <CircularProgress 
            variant="determinate"
            value={progress}
            sx={{ 
              color: '#FFD700',
              width: '60px !important',
              height: '60px !important'
            }}
          />
        </Box>
      )}

      {/* Сообщение об ошибке */}
      {isError && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          onClose={handleCloseError}
        >
          {error}
        </Alert>
      )}

      {/* Заголовок страницы */}
      <Typography variant="h4" gutterBottom sx={{ color: '#FFD700', mb: 3 }}>
        Панель администратора
      </Typography>

      {/* Кнопка обновления */}
      <Button 
        variant="contained" 
        onClick={handleRefresh}
        disabled={isLoading || isFetching}
        sx={{ mb: 2, bgcolor: '#FFD700', color: '#000' }}
      >
        Обновить список
      </Button>

      {/* Таблица пользователей */}
      <Paper sx={{ 
        width: '100%',
        overflowX: 'auto',
        backgroundColor: '#1e1e1e',
        opacity: isLoading ? 0.5 : 1,
        transition: 'opacity 0.3s ease'
      }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="admin table">
            {tableHeader}
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  {columns.map((column) => {
                    let cellContent;
                    switch (column.id) {
                      case 'isBlocked':
                        cellContent = (
                          <Switch
                            checked={!user.isBlocked}
                            onChange={() => handleToggleBlock(user.id, user.isBlocked)}
                            color="primary"
                            disabled={user.role === 'admin' || user.id === currentUser?.id || isLoading}
                          />
                        );
                        break;
                      case 'actions':
                        cellContent = (
                          user.role !== 'admin' && user.id !== currentUser?.id && (
                            <IconButton 
                              edge="end" 
                              onClick={() => handleDeleteUser(user.id)}
                              sx={{ color: '#ff6666' }}
                              disabled={isLoading}
                            >
                              <DeleteIcon />
                            </IconButton>
                          )
                        );
                        break;
                      case 'role':
                        cellContent = (
                          <Typography color={user.role === 'admin' ? '#ff0000' : '#FFD700'}>
                            {user.role}
                          </Typography>
                        );
                        break;
                      default:
                        cellContent = user[column.id];
                    }
                    return (
                      <TableCell 
                        key={column.id} 
                        sx={{ 
                          color: '#FFF',
                          minWidth: column.width
                        }}
                      >
                        {cellContent}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Всплывающее мини-сообщение об успехе */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={handleCloseSuccessMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert
          onClose={handleCloseSuccessMessage}
          severity="success"
          sx={{ width: '100%' }}
        >
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default AdminPanel;