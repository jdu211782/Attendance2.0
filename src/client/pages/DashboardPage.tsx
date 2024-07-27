import React, { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import Header from '../components/Header'; // Импорт компонента Header
import MainContent from '../components/MainContent'; // Импорт компонента MainContent
import '@fontsource/poppins/500.css'; // Импорт шрифта Poppins
import axiosInstance from "../.././utils/libs/axios"

interface DashboardPageProps {
  employeeData: any;  // Данные сотрудника, уточните тип данных
  onLogout: () => void; // Функция для выхода из системы
}

const DashboardPage: React.FC<DashboardPageProps> = ({ employeeData, onLogout }) => {
  const [tabIndex, setTabIndex] = useState<number>(0); // Индекс выбранной вкладки
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Элемент для меню

  // Обработчик изменения вкладки
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  // Обработчик открытия меню
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Обработчик закрытия меню
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  useEffect(()=>{
 
    const getData=async()=>{
      try {
        const {data}=await axiosInstance.get("/posts")
        if(data){
          console.log(data);
          
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData()
    const postMethod=async()=>{
      const info={name:"Alimardon",password:"1qazxsw"}
      try {
        
        const {data}=await axiosInstance.put("http://localhost:3000/users/2",info)
        if(data){
          console.log(data);
          
        }
      } catch (error) {
        console.log(error);
      }
    }
    postMethod()
  },[])

  return (
    <Container 
      maxWidth="xs" 
      sx={{ 
        background: '#f4f4f4', // Цвет фона контейнера
        minHeight: '100vh', // Минимальная высота контейнера
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden', 
        p: 2,
        paddingBottom: '20px',
        pt: 4,
      }}
    >
      {/* Компонент Header с функциями для выхода и отображения имени сотрудника */}
      <Header
        onLogout={onLogout}
        employeeName={employeeData.name}
        anchorEl={anchorEl}
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
      />
      <Box sx={{ flexGrow: 1 }}>
        {/* Компонент MainContent с текущей вкладкой и данными по посещаемости */}
        <MainContent 
          tabIndex={tabIndex} 
          handleTabChange={handleTabChange}
          attendanceSummary={employeeData.attendanceSummary} 
        />
      </Box>
    </Container>
  );
};

export default DashboardPage;
