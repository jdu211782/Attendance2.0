import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import axiosInstance from '../../utils/libs/axios';
import axios, { AxiosError } from 'axios';
import { Employee } from '../../employees';

// Интерфейс для пропсов компонента LoginPage
interface LoginPageProps {
  onLoginSuccess: (employee: Employee) => void; // Функция, вызываемая при успешном входе
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  // Состояние для хранения значений полей ввода и сообщения об ошибке
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Обработчик отправки формы
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    setError(''); // Сбрасываем сообщение об ошибке

    // Проверяем, что все поля заполнены
    if (!employeeId || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    try {
      console.log('Попытка входа c ID:', employeeId);
      // Выполняем запрос на сервер для аутентификации
      const response = await axiosInstance.post("/sign-in", {
        employee_id: employeeId,
        password: password
      });

      console.log('Ответ от сервера:', response);

      // Проверяем, что токены присутствуют в ответе
      if (response.data && response.data.data && response.data.data.access_token) {
        const accessToken = response.data.data.access_token;
        const refreshToken = response.data.data.refresh_token;
        
        // Сохраняем токены в localStorage
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        console.log('Токены сохранены в localStorage');

        // Создаем объект сотрудника с полученными данными и значениями по умолчанию
        const tempEmployeeData: Employee = {
          id: parseInt(employeeId, 10), // Преобразуем строку в число
          username: response.data.employee_id || 'Unknown',
          password: '', // Не храним пароль в объекте сотрудника
          role: response.data.data.role || 'employee', // Изменяем здесь на 'role'
          position: response.data.position || 'Unknown', // Обновляем поле position
          checkInTime: null,
          checkOutTime: null,
          location: 'Unknown',
          status: 'Absent', // По умолчанию отсутствует
          attendanceSummary: {
            earlyLeaves: 0,
            absences: 0,
            lateIns: 0,
            leaves: 0
          }
        };

        console.log('Временные данные сотрудника:', tempEmployeeData);
        onLoginSuccess(tempEmployeeData); // Вызываем функцию при успешном входе
        
        // Перенаправляем на соответствующую страницу в зависимости от роли
        if (tempEmployeeData.role === 'ADMIN') {
          navigate("/admin"); // Перенаправляем на страницу админа
        } else {
          navigate("/"); // Перенаправляем на страницу сотрудника
        }
      } else {
        console.error('Токены отсутствуют в ответе');
        setError('Неверный ответ от сервера');
      }
    } catch (err) {
      console.error('Ошибка при входе:', err);
      
      // Обработка ошибок, связанных с axios
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        console.error("Детали ошибки:", axiosError);
        console.error("Статус ответа:", axiosError.response?.status);
        console.error("Данные ответа:", axiosError.response?.data);
        
        if (axiosError.response) {
          const errorMessage = typeof axiosError.response.data === 'object' && axiosError.response.data !== null
            ? (axiosError.response.data as { message?: string }).message || 'Неизвестная ошибка'
            : 'Неизвестная ошибка';
          setError(`Ошибка ${axiosError.response.status}: ${errorMessage}`);
        } else if (axiosError.request) {
          setError('Нет ответа от сервера. Проверьте подключение к интернету.');
        } else {
          setError(`Ошибка: ${axiosError.message}`);
        }
      } else {
        console.error("Неизвестная ошибка:", err);
        setError("Произошла неизвестная ошибка");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Вход в систему
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="employee_id"
            label="ID сотрудника"
            name="employee_id"
            autoComplete="employee_id"
            autoFocus
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
