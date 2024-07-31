// App.tsx

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './client/pages/LoginPage';
import DashboardPage from './client/pages/DashboardPage';
import { Employee } from './employees'; // Путь может отличаться

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);

  const handleLoginSuccess = (employee: Employee) => {
    console.log('Login successful:', employee);
    setIsLoggedIn(true);
    setEmployeeData(employee);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmployeeData(null);
    localStorage.removeItem('token');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route 
          path="/" 
          element={
            isLoggedIn && employeeData 
              ? <DashboardPage employeeData={employeeData} onLogout={handleLogout} />
              : <Navigate to="/login" />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;