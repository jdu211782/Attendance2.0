import React from 'react';
import { Tabs, Tab, createTheme, ThemeProvider } from '@mui/material';
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
    // Оборачиваем Tabs в ThemeProvider с локальной темой
    <ThemeProvider theme={localTheme}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        sx={{
          mb: 2, 
        }}
      >
        <Tab icon={<AccessTimeIcon />} aria-label="time" />
        <Tab icon={<BarChartIcon />} aria-label="summary" />
      </Tabs>
    </ThemeProvider>
  );
};

export default TabsComponent;
