import React from 'react';
import { Tabs, Tab, createTheme, ThemeProvider, styled } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BarChartIcon from '@mui/icons-material/BarChart';

interface TabsProps {
  tabIndex: number;
  handleTabChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 'auto',
  '& .MuiTab-root': {
    minWidth: 120,
    minHeight: 50,
    fontSize: '1rem',
  },
}));

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
      <StyledTabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
      >
        <Tab
          icon={<AccessTimeIcon sx={{ fontSize: 32 }} />}
          aria-label="time"
        />
        <Tab
          icon={<BarChartIcon sx={{ fontSize: 32 }} />}
          aria-label="summary"
        />
      </StyledTabs>
    </ThemeProvider>
  );
};

export default TabsComponent;
