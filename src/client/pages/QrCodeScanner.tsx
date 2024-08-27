import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';

const QRCodeScanner: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const webcamRef = useRef<Webcam | null>(null);

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
              sendEmployeeId(code.data);
            }
          }
        };
      }
    }
  }, [webcamRef]);

  const sendEmployeeId = (employeeId: string) => {
    // Здесь вы можете отправить employee_id на сервер
    console.log(`Отправка employee_id: ${employeeId}`);
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

  return (
    <div>
      {isScanning ? (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: 'environment' }}
        />
      ) : (
        <div>Пауза после сканирования. Подождите 5 секунд...</div>
      )}
      {result && <p>Последний отсканированный employee_id: {result}</p>}
    </div>
  );
};

export default QRCodeScanner;