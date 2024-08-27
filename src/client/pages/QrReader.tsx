
import "../styles/QrStyles.css";

import React, { useState, useEffect } from 'react';
import { QrScanner } from 'react-qr-scanner';

const QRScanner = () => {
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  const handleScan = (result: { text: string } | null) => {
    if (result?.text) {
      setEmployeeId(result.text);
      setIsScanning(false);
      sendEmployeeId(result.text); // Отправка данных
    } else {
      console.log('Не удалось считать QR код');
      setIsScanning(false);
    }
  };

  const handleError = (error: any) => {
    console.error('Ошибка сканирования:', error);
    setIsScanning(false);
  };

  // Функция для отправки данных
  const sendEmployeeId = (id: string) => {
    // Здесь будет вызов API
    console.log(`Отправка employee_id: ${id}`);

    // Пример: использование fetch для отправки на сервер
    // fetch('https://example.com/api/employee', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ employeeId: id }),
    // })
    // .then(response => response.json())
    // .then(data => console.log('Успешно отправлено:', data))
    // .catch(error => console.error('Ошибка при отправке:', error));
  };

  useEffect(() => {
    if (!isScanning) {
      const timeout = setTimeout(() => {
        setIsScanning(true);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [isScanning]);

  return (
    <div>
      {isScanning ? (
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      ) : (
        <p>Пауза после сканирования, подождите...</p>
      )}
      {employeeId && <p>Последний отсканированный employee_id: {employeeId}</p>}
    </div>
  );
};

export default QRScanner;


