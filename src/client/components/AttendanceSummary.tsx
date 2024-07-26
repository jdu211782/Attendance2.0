import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, IconButton, Tabs, Tab } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BarChartIcon from '@mui/icons-material/BarChart';
import MonthSelectorModal from './MonthSelectorModal'; 
import WeeklyTimesheet from './WeeklyTimesheet'; 
import { SelectChangeEvent } from '@mui/material';

interface AttendanceSummaryProps {
  attendanceSummary: {
    [key: string]: number;
  };
}

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

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

const AttendanceSummary: React.FC<AttendanceSummaryProps> = ({ attendanceSummary }) => {
  const [open, setOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number>(4); // Default to May
  const [selectedYear, setSelectedYear] = useState<number>(2024); // Default year

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setSelectedMonth(event.target.value as number);
    handleClose();
  };
  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setSelectedYear(event.target.value as number);
  };

  return (
    <Box sx={{ p: 3, borderRadius: 4, backgroundColor: '#ffffff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
        <Typography
          variant="h6"
          sx={{
            mb: 1,
            color: '#1c1f26',
            alignSelf: 'flex-start',
          }}
        >
          Attendance
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#1c1f26' }}>
            {months[selectedMonth]} {selectedYear}
          </Typography>
          <IconButton onClick={handleOpen} sx={{ color: '#105f82' }}>
            <CalendarTodayIcon />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {Object.entries(attendanceSummary).map(([key, value]) => (
          <Grid item xs={6} sm={3} key={key}>
            <Paper
              elevation={3}
              sx={{
                height: 70,
                p: 2,
                textAlign: 'left',
                background: `${statusColors[key as keyof typeof statusColors].background}`,
                position: 'relative',
                borderRadius: 3,
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
              <Typography variant="body1" sx={{ color: '#1c1f26', fontSize: '1.25rem' }}>
                {String(value)}
              </Typography>
              <Typography variant="body2" sx={{ color: `${statusColors[key as keyof typeof statusColors].textColor}` }}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <MonthSelectorModal
        open={open}
        onClose={handleClose}
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
      />

      <WeeklyTimesheet
        weekNumber={1}
        dateRange="07 - 13 Jan"
        timesheetData={[
          { day: 7, weekday: 'Sun', checkIn: '08:00', checkOut: '17:00', totalHours: '9:00' },
          { day: 8, weekday: 'Mon', checkIn: '08:00', checkOut: '17:00', totalHours: '9:00' },
          // Добавьте данные для остальных дней
        ]}
      />
    </Box>
  );
};

export default AttendanceSummary;