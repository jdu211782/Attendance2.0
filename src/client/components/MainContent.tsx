// components/MainContent.tsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Divider, Tabs, Tab } from '@mui/material';
import { format, intervalToDuration } from 'date-fns';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttendanceSummary from './AttendanceSummary';

interface MainContentProps {
  tabIndex: number;
  handleTabChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
  attendanceSummary: {
    [key: string]: number;
  };
  userId: number;
  username: string;
}

const MainContent: React.FC<MainContentProps> = ({ tabIndex, handleTabChange, attendanceSummary, userId, username }) => {
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<Date | null>(null);
  const [totalHours, setTotalHours] = useState<string>('--:--');
  const [message, setMessage] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>(format(new Date(), 'HH:mm:ss'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(format(new Date(), 'HH:mm:ss'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Геолокация не поддерживается вашим браузером'));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      }
    });
  };

  const sendAttendanceData = async (type: 'checkIn' | 'checkOut') => {
    try {
      const position = await getCurrentPosition();
      const data = {
        userId,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        type
      };
  
      // Здесь должен быть код для отправки данных на сервер
      // Пока что просто логируем данные
      console.log(`Данные ${type} готовы к отправке:`, data);
  
      return new Date();
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            console.error("Пользователь отказал в доступе к геолокации");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Информация о местоположении недоступна");
            break;
          case error.TIMEOUT:
            console.error("Истекло время ожидания запроса на получение местоположения пользователя");
            break;
        }
      }
      throw error;
    }
  };

  const handleComeClick = async () => {
    try {
      const checkInTime = await sendAttendanceData('checkIn');
      setCheckInTime(checkInTime);
      setMessage(`Добро пожаловать! Вы отметились в ${format(checkInTime, 'HH:mm')}`);
      setCheckOutTime(null);
      setTotalHours('--:--');
    } catch (error) {
      console.error('Ошибка при отметке прихода:', error);
      setMessage('Ошибка при отметке прихода. Пожалуйста, проверьте разрешения на геолокацию и попробуйте снова.');
    }
  };

  const handleLeaveClick = async () => {
    if (checkInTime) {
      try {
        const checkOutTime = await sendAttendanceData('checkOut');
        setCheckOutTime(checkOutTime);
        setMessage(`До свидания! Вы отметились в ${format(checkOutTime, 'HH:mm')}`);
        const duration = intervalToDuration({ start: checkInTime, end: checkOutTime });
        setTotalHours(`${duration.hours || 0}ч ${duration.minutes || 0}м`);
      } catch (error) {
        console.error('Ошибка при отметке ухода:', error);
        setMessage('Ошибка при отметке ухода. Пожалуйста, проверьте разрешения на геолокацию и попробуйте снова.');
      }
    } else {
      setMessage('Сначала нужно отметить приход!');
    }
  };

  return (
    <Box sx={{
      flexGrow: 1,
      bgcolor: 'white',
      borderRadius: 4,
      boxShadow: 3,
      p: 3,
      overflow: 'hidden',
      textAlign: 'center',
      position: 'relative',
      padding: 1,
    }}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        sx={{
          mb: 2,
          width: '100%',
          '.MuiTabs-flexContainer': {
            width: '100%',
          },
          '.MuiTab-root': {
            flexGrow: 1,
            minWidth: 120,
            minHeight: 50,
            fontSize: '1rem',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
            '&.Mui-selected': {
              fontWeight: 'bold',
            },
          },
        }}
      >
        <Tab icon={<AccessTimeIcon sx={{ fontSize: 32 }} />} aria-label="time" />
        <Tab icon={<BarChartIcon sx={{ fontSize: 32 }} />} aria-label="summary" />
      </Tabs>

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
                {checkInTime ? format(checkInTime, 'HH:mm') : '--:--'}
              </Typography>
              <Typography variant="body2" color="#666666" sx={{ mt: 1 }}>
                Check In
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: '#d6d6d6' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ color: '#1c1f26' }}>
                {checkOutTime ? format(checkOutTime, 'HH:mm') : '--:--'}
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
    </Box>
  );
};

export default MainContent;