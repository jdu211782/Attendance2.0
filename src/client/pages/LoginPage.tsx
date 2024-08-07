// src/client/pages/LoginPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Employee, employees } from '../../employees'; // Обновленный путь
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  useTheme,
} from '@mui/material';

interface LoginPageProps {
  onLoginSuccess: (employee: Employee) => void;
}

function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogin = () => {
    const employee = employees.find(
      emp => emp.username === username && emp.password === password
    );
    if (employee) {
      localStorage.setItem('token', 'fake-jwt-token'); // Симуляция токена
      onLoginSuccess(employee);
      if (employee.isAdmin) {
        navigate('/admin'); // Перенаправление для админа
      } else {
        navigate('/'); // Перенаправление для обычного пользователя
      }
    } else {
      setError('Неверное имя пользователя или пароль');
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          borderRadius: 4,
          boxShadow: 3,
          backgroundColor: '#f0f8ff',
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Имя пользователя"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Пароль"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: theme.palette.success.light,
            '&:hover': {
              backgroundColor: theme.palette.success.dark,
            },
          }}
          onClick={handleLogin}
        >
          Продолжить
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;
