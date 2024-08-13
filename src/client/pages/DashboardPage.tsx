import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import '@fontsource/poppins/500.css';
import { Employee } from '../../employees';
import mockData from "../components/Table/mockData"; 
import { Column, TableData } from "../components/Table/types";

interface DashboardPageProps {
  employeeData: Employee | null; // Добавлен тип null, чтобы учитывать отсутствие данных
  onLogout: () => void;
}

// Пример данных для колонок
const columns: Column[] = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name', filterable: true },
  { id: 'status', label: 'Status', filterable: true, filterValues: ['Present', 'Absent', 'Excused Absence'] },
];

const DashboardPage: React.FC<DashboardPageProps> = ({ employeeData, onLogout }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  if (!employeeData) {
    return <div>Загрузка данных сотрудника...</div>; // Сообщение для состояния загрузки
  }

  if (!employeeData.username) {
    return <div>Данные сотрудника не найдены.</div>;
  }

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container 
      maxWidth="xs" 
      sx={{ 
        background: '#f4f4f4',
        minHeight: '100vh',
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden', 
        p: 2,
        paddingBottom: '20px',
        pt: 4,
      }}
    >
      <Header
        onLogout={onLogout}
        employeeName={employeeData.username}
        anchorEl={anchorEl}
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
      />
      <Box sx={{ flexGrow: 1 }}>
        <MainContent 
          tabIndex={tabIndex} 
          handleTabChange={handleTabChange}
          attendanceSummary={employeeData.attendanceSummary}
          userId={employeeData.id}
          username={employeeData.username}
          tableData={mockData as TableData[]}
          tableColumns={columns}
        />
      </Box>
    </Container>
  );
};

export default DashboardPage;
