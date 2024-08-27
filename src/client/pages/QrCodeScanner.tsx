import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import { Box, Typography, Paper, Snackbar } from '@mui/material';
import { createByQRCode } from '../../utils/libs/axios'; // Предполагаем, что функция импортируется из файла api

const QRCodeScanner: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const webcamRef = useRef<Webcam | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setLocation(position.coords),
        (error) => console.error('Error getting location:', error)
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

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

  const sendEmployeeIdWithLocation = async (employeeId: string) => {
    try {
      if (!location) {
        throw new Error('Location is not available');
      }
      await createByQRCode(employeeId, location.latitude, location.longitude);
      setSnackbarMessage('Record created successfully');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Error creating record');
      setSnackbarOpen(true);
      console.error('Error sending employee_id and location:', error);
    }
  };

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