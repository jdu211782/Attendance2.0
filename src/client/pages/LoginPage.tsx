// LoginPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Employee, employees } from '../../employees';
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
      (emp) => emp.username === username && emp.password === password
    );
    if (employee) {
      onLoginSuccess(employee);
      navigate('/'); // Перенаправление после входа
    } else {
      setError('Неверное имя пользователя или пароль');
    }
  };

  return (
    <Container
      maxWidth="sm" // Увеличиваем ширину контейнера
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
          padding: 4, // Увеличиваем padding
          borderRadius: 4,
          boxShadow: 3,
          backgroundColor: '#f0f8ff',
          width: '100%', // Ширина блока должна быть 100% от ширины контейнера
          maxWidth: 400, // Ограничение максимальной ширины для предотвращения слишком большой растяжки
        }}
      >
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
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
          label="Password"
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
          Continue
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;
