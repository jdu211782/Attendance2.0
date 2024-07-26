import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import '@fontsource/poppins/500.css';

interface DashboardPageProps {
  employeeData: any;  // Уточните тип данных
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ employeeData, onLogout }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
    <Container maxWidth="xs" sx={{ 
      background: '#f4f4f4',
      minHeight: 'auto', 
      display: 'flex', 
      flexDirection: 'column', 
      overflow: 'hidden', 
      p: 2,
      paddingBottom: '20px',
      pt: 4, // Паддинг сверху для поднятия содержимого
    }}>
      <Header
        onLogout={onLogout}
        employeeName={employeeData.name}
        anchorEl={anchorEl}
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
      />
      <Box sx={{ flexGrow: 1 }}>
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
