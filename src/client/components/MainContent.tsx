import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { format, intervalToDuration } from 'date-fns';
import AttendanceSummary from './AttendanceSummary';
import TabsComponent from './TabsComponent';
import AttendanceDataProvider from './Table/AttendanceDataProvider';
import { Column } from './Table/types';
import axiosInstance from '../../utils/libs/axios';

interface MainContentProps {
  tabIndex: number;
  handleTabChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
  attendanceSummary: {
    [key: string]: number;
  };
  employeeId: string;
  username: string;
  tableColumns: Column[];
}

interface DashboardData {
  come_time: string;
  leave_time: string;
  total_hours: string;
}

const MainContent: React.FC<MainContentProps> = ({
  tabIndex,
  handleTabChange,
  attendanceSummary,
  employeeId,
  tableColumns,
}) => {
  const [checkInTime, setCheckInTime] = useState<string>('--:--');
  const [checkOutTime, setCheckOutTime] = useState<string>('--:--');
  const [totalHours, setTotalHours] = useState<string>('--:--');
  const [message, setMessage] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>(format(new Date(), 'HH:mm:ss'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(format(new Date(), 'HH:mm:ss'));
    }, 1000);

    fetchDashboardData();

    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get<{ data: DashboardData, status: boolean }>('/user/dashboard');
      console.log('Ответ от сервера:', response);
      
      if (response.data.status) {
        const { come_time, leave_time, total_hours } = response.data.data;
        setCheckInTime(come_time);
        setCheckOutTime(leave_time);
        setTotalHours(total_hours);
      }
    } catch (error) {
      console.error('Ошибка при получении данных дашборда:', error);
    }
  };

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Геолокация не поддерживается вашим браузером'));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        });
      }
    });
  };

  const sendAttendanceData = async (type: 'checkIn' | 'checkOut') => {
    try {
      const position = await getCurrentPosition();
      const data = {
        employee_id: employeeId,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        type,
      };

      await axiosInstance.post('/attendance', data);
      console.log(`Данные ${type} успешно отправлены`);
      fetchDashboardData(); // Обновляем данные после отправки
    } catch (error) {
      console.error(`Ошибка при отправке данных ${type}:`, error);
      throw error;
    }
  };

  const handleComeClick = async () => {
    try {
      await sendAttendanceData('checkIn');
      await fetchDashboardData(); // Обновляем данные после отправки
      setMessage(`Добро пожаловать! Вы отметились в ${checkInTime}`);
    } catch (error) {
      console.error('Ошибка при отметке прихода:', error);
      setMessage('Ошибка при отметке прихода. Пожалуйста, проверьте разрешения на геолокацию и попробуйте снова.');
    }
  };
  
  const handleLeaveClick = async () => {
    if (checkInTime !== '--:--') {
      try {
        await sendAttendanceData('checkOut');
        await fetchDashboardData(); // Обновляем данные после отправки
        setMessage(`До свидания! Вы отметились в ${checkOutTime}`);
      } catch (error) {
        console.error('Ошибка при отметке ухода:', error);
        setMessage('Ошибка при отметке ухода. Пожалуйста, проверьте разрешения на геолокацию и попробуйте снова.');
      }
    } else {
      setMessage('Сначала нужно отметить приход!');
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'white',
        borderRadius: 4,
        boxShadow: 3,
        p: 3,
        overflow: 'hidden',
        textAlign: 'center',
        position: 'relative',
        padding: 1,
      }}
    >
      <TabsComponent tabIndex={tabIndex} handleTabChange={handleTabChange} />

      {tabIndex === 0 && (
        <>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1c1f26' }}>
            {currentTime}
          </Typography>
          <Typography variant="h6" color="#666666" sx={{ fontSize: '0.70rem' }}>
            {format(new Date(), 'PPP - EEEE')}
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ color: '#1c1f26' }}>
                {checkInTime}
              </Typography>
              <Typography variant="body2" color="#666666" sx={{ mt: 1 }}>
                Check In
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: '#d6d6d6' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ color: '#1c1f26' }}>
                {checkOutTime}
              </Typography>
              <Typography variant="body2" color="#666666" sx={{ mt: 1 }}>
                Check Out
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: '#d6d6d6' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ color: '#1c1f26' }}>
                {totalHours}
              </Typography>
              <Typography variant="body2" color="#666666" sx={{ mt: 1 }}>
                Total Hours
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleComeClick}
              sx={{
                borderRadius: 28,
                backgroundColor: '#1cbeca',
                '&:hover': {
                  backgroundColor: '#1a9bde',
                },
              }}
            >
              Come
            </Button>
            <Button
              variant="contained"
              onClick={handleLeaveClick}
              sx={{
                borderRadius: 28,
                backgroundColor: '#ff9500',
                '&:hover': {
                  backgroundColor: '#e88e00',
                },
              }}
            >
              Leave
            </Button>
          </Box>
          {message && (
            <Typography variant="body1" align="center" sx={{ mt: 2, color: '#1cbeca' }}>
              {message}
            </Typography>
          )}
        </>
      )}

      {tabIndex === 1 && <AttendanceSummary attendanceSummary={attendanceSummary} />}

      {tabIndex === 2 && (
        <Box sx={{ overflowX: 'auto' }}>
          <AttendanceDataProvider />
        </Box>
      )}
    </Box>
  );
};

export default MainContent;
