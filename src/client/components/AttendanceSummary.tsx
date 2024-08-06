// AttendanceSummary.tsx

import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, IconButton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MonthSelectorModal from './MonthSelectorModal';
import WeeklyTimesheet from './WeeklyTimesheet';
import { SelectChangeEvent } from '@mui/material';
import { timesheetData } from './TimesheetData';

interface AttendanceSummaryProps {
  attendanceSummary: {
    [key: string]: number;
  };
}

// Цветовая схема для разных статусов
const statusColors = {
  earlyLeaves: {
    background: '#f1f1ff',
    lineColor: '#7c7cf8',
    textColor: '#7c7cf8',
  },
  absences: {
    background: '#e8eff3',
    lineColor: '#2d7392',
    textColor: '#2d7392',
  },
  lateIns: {
    background: '#ffeceb',
    lineColor: '#ff847d',
    textColor: '#ff847d',
  },
  leaves: {
    background: '#fff5e6',
    lineColor: '#ffbd5e',
    textColor: '#ffbd5e',
  },
};

// Массив названий месяцев
const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

const AttendanceSummary: React.FC<AttendanceSummaryProps> = ({ attendanceSummary }) => {
  // Состояние для управления открытием/закрытием модального окна выбора месяца
  const [open, setOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number>(4); // Изначально выбран май
  const [selectedYear, setSelectedYear] = useState<number>(2024); // Изначально выбран 2024 год

  // Функция для открытия модального окна
  const handleOpen = () => setOpen(true);
  // Функция для закрытия модального окна
  const handleClose = () => setOpen(false);
  // Обработчик изменения месяца
  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setSelectedMonth(event.target.value as number);
    handleClose();
  };
  // Обработчик изменения года
  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setSelectedYear(event.target.value as number);
  };

  return (
    <Box sx={{ p: 3, borderRadius: 4, backgroundColor: '#ffffff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      {/* Заголовок и кнопка для выбора месяца */}
      <Box sx={{ display: 'flex', marginTop: -3.5, flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
        <Typography variant="h6" sx={{ mt: 1, color: '#111111', alignSelf: 'flex-start', fontSize: '15px' }}>
          
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', mb: 0 }}>
          <Typography variant="h6" sx={{ color: '#111111', fontSize: '22px', fontWeight: 'medium' }}>
            {months[selectedMonth]} {selectedYear}
          </Typography>
          <IconButton onClick={handleOpen} sx={{ color: '#111111' }}>
            <CalendarTodayIcon />
          </IconButton>
        </Box>
      </Box>
      
      {/* Секция с карточками для отображения данных */}
      <Grid container spacing={1}>
        {Object.entries(attendanceSummary).map(([key, value]) => (
          <Grid item xs={6} sm={3} key={key}>
            <Paper
              elevation={3}
              sx={{
                height: 70,
                p: 2,
                textAlign: 'left',
                borderTop: '5',
                borderColor: 'black',
                background: `${statusColors[key as keyof typeof statusColors].background}`,
                position: 'relative',
                borderRadius: '5px 5px 10px 10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'box-shadow 0.3s ease',
                '&:hover': {
                  boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '5px',
                  backgroundColor: `${statusColors[key as keyof typeof statusColors].lineColor}`,
                  borderRadius: '10px 10px 0 0',
                },
              }} 
            >
              <Typography variant="body1" sx={{ color: '#1c1f26', fontSize: '1.2rem' }}>
                {String(value)}
              </Typography>
              <Typography variant="body2" sx={{ color: `${statusColors[key as keyof typeof statusColors].textColor}` }}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Модальное окно для выбора месяца и года */}
      <MonthSelectorModal
        open={open}
        onClose={handleClose}
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
      />

      {/* Компонент для отображения недельного графика */}
      <WeeklyTimesheet timesheetData={timesheetData} />
    </Box>
  );
};

export default AttendanceSummary;