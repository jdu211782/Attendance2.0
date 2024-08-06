// App.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './client/pages/LoginPage';
import DashboardPage from './client/pages/DashboardPage';
import AdminDashboard from './admin/pages/AdminDashboard'; // Обновленный путь
import { Employee } from './employees'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Симуляция проверки токена и получения данных пользователя
      const savedEmployee = JSON.parse(localStorage.getItem('employeeData') || '{}') as Employee;
      if (savedEmployee?.username) {
        setIsLoggedIn(true);
        setEmployeeData(savedEmployee);
      }
    }
  }, []);

  const handleLoginSuccess = (employee: Employee) => {
    console.log('Login successful:', employee);
    setIsLoggedIn(true);
    setEmployeeData(employee);
    localStorage.setItem('employeeData', JSON.stringify(employee));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmployeeData(null);
    localStorage.removeItem('token');
    localStorage.removeItem('employeeData');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route 
          path="/" 
          element={
            isLoggedIn && employeeData ? (
              employeeData.isAdmin ? (
                <Navigate to="/admin" />
              ) : (
                <DashboardPage employeeData={employeeData} onLogout={handleLogout} />
              )
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/admin" 
          element={
            isLoggedIn && employeeData?.isAdmin ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
