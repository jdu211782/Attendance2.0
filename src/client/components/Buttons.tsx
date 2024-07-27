// Buttons.tsx

import React from 'react';
import { Tabs, Tab, createTheme, ThemeProvider, styled } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BarChartIcon from '@mui/icons-material/BarChart';

interface TabsProps {
  tabIndex: number;
  handleTabChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const TabsComponent: React.FC<TabsProps> = ({ tabIndex, handleTabChange }) => {
  // Создаем локальную тему с переопределенными цветами
  const localTheme = createTheme({
    palette: {
      primary: {
        main: '#ff3b30', // Красный цвет
      },
    },
  });

  return (
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        sx={{
          minHeight: 'auto',
          backgroundColor: '#f0f0f0',
          borderRadius: 8,
          '& .MuiTab-root': {
            minWidth: 120,
            minHeight: 50,
            fontSize: '1rem',
            color: '#333',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            '&:hover': {
              backgroundColor: '#e0e0e0',
              transform: 'scale(1.05)',
            },
            '&.Mui-selected': {
              backgroundColor: '#ffebea',
              color: '#ff3b30',
              fontWeight: 'bold',
              borderBottom: '2px solid #ff3b30',
            },
          },
        }}
      >
        <Tab
          icon={<AccessTimeIcon sx={{ fontSize: 32 }} />}
          aria-label="time"
        />
        <Tab
          icon={<BarChartIcon sx={{ fontSize: 32 }} />}
          aria-label="summary"
        />
      </Tabs>
  );
};

export default TabsComponent;