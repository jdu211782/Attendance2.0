import React from 'react';
import { Box, Typography, Grid, MenuItem, Select, FormControl, SelectChangeEvent } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import { TimesheetDay, TimesheetWeekData, weekRanges, timesheetData } from './TimesheetData';

const getTimeColor = (time: string, isCheckIn: boolean, isWeekend: boolean) => {
  if (!time) return isWeekend ? '#cccccc' : '#ff3b30';
  const [hours, minutes] = time.split(':').map(Number);
  if (isCheckIn) {
    return hours < 9 || (hours === 10 && minutes === 0) ? '#00af6c' : '#ff9500';
  } else {
    return hours > 17 || (hours === 17 && minutes >= 30) ? '#00af6c' : '#ff9500';
  }
};

const getTotalHoursColor = (totalHours: string, isWeekend: boolean) => {
  if (!totalHours) return isWeekend ? '#cccccc' : '#ff3b30';
  const [hours, minutes] = totalHours.split(':').map(Number);
  if (hours > 8 || (hours === 8 && minutes > 0)) {
    return '#00af6c';
  } else if (hours < 2 || (hours === 2 && minutes === 0)) {
    return isWeekend ? '#00af6c' : '#ff3b30';
  } else {
    return '#ff9500';
  }
};

const formatDay = (day: number) => {
  return String(day).padStart(2, '0');
};

const isWeekend = (weekday: string) => {
  return weekday === 'Sat' || weekday === 'Sun';
};

const WeeklyTimesheet: React.FC<{ timesheetData: TimesheetWeekData }> = ({ timesheetData }) => {
  const [selectedWeek, setSelectedWeek] = React.useState(weekRanges[0]);

  const handleWeekChange = (event: SelectChangeEvent<string>) => {
    setSelectedWeek(event.target.value);
  };

  const weekDisplayNames = weekRanges.map((_, index) => `Week ${index + 1}`);

  return (
    <Box sx={{ mb: 3, mt: 3, backgroundColor: '#ffffff', borderRadius: 2, overflow: 'hidden', boxShadow: 1, p: 1 }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        p: 1,
        mb: 1,
        boxShadow: 1,
      }}>
        <Typography variant="h6">Weeks</Typography>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <Select
            value={selectedWeek}
            onChange={handleWeekChange}
            sx={{ textAlign: 'center' }}
            MenuProps={{
              PaperProps: {
                sx: {
                  '& .MuiMenuItem-root': {
                    display: 'flex',
                    justifyContent: 'center',
                  },
                },
              },
            }}
          >
            {weekRanges.map((weekRange, index) => (
              <MenuItem key={index} value={weekRange} sx={{ justifyContent: 'center' }}>
                {weekDisplayNames[index]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={1}>
        {timesheetData[selectedWeek]?.map((day, index) => {
          const checkInColor = getTimeColor(day.checkIn, true, isWeekend(day.weekday));
          const checkOutColor = getTimeColor(day.checkOut, false, isWeekend(day.weekday));
          const totalHoursColor = getTotalHoursColor(day.totalHours, isWeekend(day.weekday));
          
          // Добавим логирование для отладки
          console.log(`Day ${day.day} - CheckIn: ${checkInColor}, CheckOut: ${checkOutColor}, TotalHours: ${totalHoursColor}`);

          return (
            <Grid item xs={12} key={index}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#ffffff',
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
                p: 1,
                boxShadow: 1,
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px' }}>
                  <Typography variant="body2" sx={{ fontSize: '12px' }}>
                    {formatDay(day.day)} {day.weekday}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTimeIcon style={{ marginRight: '4px', color: checkInColor }} />
                  <Typography variant="body2" style={{ color: checkInColor, fontSize: '12px' }}>
                    {day.checkIn || '--:--'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ExitToAppIcon style={{ marginRight: '4px', color: checkOutColor }} />
                  <Typography variant="body2" style={{ color: checkOutColor, fontSize: '12px' }}>
                    {day.checkOut || '--:--'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TimelapseIcon style={{ marginRight: '4px', color: totalHoursColor }} />
                  <Typography variant="body2" style={{ color: totalHoursColor, fontSize: '12px' }}>
                    {day.totalHours || '--:--'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default WeeklyTimesheet;