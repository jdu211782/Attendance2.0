import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import { Box, Typography, Paper, Snackbar } from '@mui/material';
import { createByQRCode } from '../../utils/libs/axios'; // Путь может отличаться в зависимости от структуры вашего проекта

const QRCodeScanner: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const webcamRef = useRef<Webcam | null>(null);

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

  const sendEmployeeIdWithLocation = async (employeeId: string) => {
    try {
      const position = await getCurrentPosition();
      console.log(position);
      
      const response = await createByQRCode(employeeId, position.coords.latitude, position.coords.longitude);
      console.log(response);
      
      setSnackbarMessage('Запись успешно создана');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
      setSnackbarMessage('Ошибка при создании записи');
      setSnackbarOpen(true);
    }
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(image, 0, 0, image.width, image.height);
            const imageData = ctx.getImageData(0, 0, image.width, image.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            if (code) {
              setResult(code.data);
              setIsScanning(false);
              sendEmployeeIdWithLocation(code.data);
            }
          }
        };
      }
    }
  }, [webcamRef]);

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        capture();
      }, 500);
      return () => clearInterval(interval);
    } else {
      const timer = setTimeout(() => {
        setIsScanning(true);
        setResult(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isScanning, capture]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          QR Code Scanner
        </Typography>
        {isScanning ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: 'environment' }}
          />
        ) : (
          <Typography variant="body1">QR Code scanned. Resuming in 5 seconds...</Typography>
        )}
      </Paper>
      {result && (
        <Typography variant="body1" gutterBottom>
          Scanned result: {result}
        </Typography>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default QRCodeScanner;
