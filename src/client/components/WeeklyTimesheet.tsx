import React from 'react';
import { Box, Typography, IconButton, Collapse, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TimelapseIcon from '@mui/icons-material/Timelapse';

// Типы данных для одного дня
interface TimesheetDay {
  day: number;
  weekday: string;
  checkIn: string;
  checkOut: string;
  totalHours: string;
}

// Свойства для компонента WeeklyTimesheet
interface WeeklyTimesheetProps {
  weekNumber: number;
  dateRange: string;
  timesheetData: TimesheetDay[];
}

// Компонент WeeklyTimesheet
const WeeklyTimesheet: React.FC<WeeklyTimesheetProps> = ({ weekNumber, dateRange, timesheetData }) => {
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        mb: 3,
        mt: 3,
        backgroundColor: '#ffffff',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 1,
        p: 1,
        maxHeight: open ? 'auto' : '150px',
        transition: 'max-height 0.3s ease-out',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          p: 1,
          cursor: 'pointer',
          boxShadow: 1,
        }}
        onClick={handleToggle}
      >
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Week {weekNumber}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666666' }}>
          {dateRange}
        </Typography>
        <IconButton size="small">
          <ExpandMoreIcon
            sx={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
          />
        </IconButton>
      </Box>
      <Collapse in={open}>
        <Grid container spacing={1} sx={{ mt: 1, maxHeight: '100px', overflowY: 'auto' }}>
          {timesheetData.map((day, index) => (
            <Grid item xs={12} key={index}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#ffffff',
                  borderRadius: 1,
                  p: 1,
                  boxShadow: 1,
                }}
              >
                <Typography variant="body2">
                  {day.day} {day.weekday}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTimeIcon sx={{ mr: 0.5 }} />
                  <Typography variant="body2">{day.checkIn}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ExitToAppIcon sx={{ mr: 0.5 }} />
                  <Typography variant="body2">{day.checkOut}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TimelapseIcon sx={{ mr: 0.5 }} />
                  <Typography variant="body2">{day.totalHours}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </Box>
  );
};

export default WeeklyTimesheet;
