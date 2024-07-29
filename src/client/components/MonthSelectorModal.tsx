// MonthSelectorModal.tsx

import React from 'react';
import { Box, Typography, IconButton, Modal, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface MonthSelectorModalProps {
  open: boolean; // Определяет, открыто ли модальное окно
  onClose: () => void; // Обработчик закрытия модального окна
  selectedMonth: number; // Выбранный месяц
  onMonthChange: (event: SelectChangeEvent<number>) => void; // Обработчик изменения месяца
  selectedYear: number; // Выбранный год
  onYearChange: (event: SelectChangeEvent<number>) => void; // Обработчик изменения года
}

// Массив с названиями месяцев
const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

// Массив с годами
const years = [2024, 2023, 2022, 2021]; // Добавьте нужные годы

const MonthSelectorModal: React.FC<MonthSelectorModalProps> = ({ open, onClose, selectedMonth, onMonthChange, selectedYear, onYearChange }) => {
  return (
    <Modal
      open={open} // Управляет видимостью модального окна
      onClose={onClose} // Закрывает модальное окно при клике вне его области
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }} // Центрирование модального окна по горизонтали и выравнивание по нижнему краю
    >
      <Box
        sx={{
          width: '90%', // Ширина модального окна в процентах от ширины экрана
          maxWidth: 400, // Максимальная ширина
          height: '60%', // Высота модального окна
          bgcolor: 'background.paper', // Фоновый цвет модального окна
          borderRadius: 2, // Радиус скругления углов
          p: 2, // Внутренний отступ
          overflowY: 'auto', // Скроллинг по вертикали, если содержимое выходит за пределы модального окна
          position: 'relative', // Относительное позиционирование для иконки закрытия
          display: 'flex',
          flexDirection: 'column', // Вертикальное выравнивание содержимого
        }}
      >
        {/* Иконка закрытия модального окна */}
        <IconButton
          onClick={onClose} // Закрывает модальное окно при нажатии
          sx={{
            position: 'absolute', // Абсолютное позиционирование для иконки закрытия
            top: 8, // Отступ сверху
            right: 8, // Отступ справа
            color: '#105f82' // Цвет иконки
          }}
        >
          <CloseIcon />
        </IconButton>
        
        {/* Заголовок модального окна */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Select month and year
        </Typography>
        
        {/* Выпадающий список для выбора года */}
        <Box sx={{ mb: 2 }}>
          <Select
            value={selectedYear} // Значение выбранного года
            onChange={onYearChange} // Обработчик изменения года
            fullWidth // Занимает всю доступную ширину
            displayEmpty // Показывает пустое значение, если не выбрано ничего
          >
            {years.map(year => (
              <MenuItem key={year} value={year}>
                {year} 
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Список месяцев */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {months.map((month, index) => (
            <Box
              key={index}
              sx={{
                p: 1, // Внутренний отступ
                borderRadius: 1, // Радиус скругления углов
                bgcolor: '#f0f0f0', // Фоновый цвет элемента
                cursor: 'pointer', // Курсор в виде указателя при наведении
                textAlign: 'left', // Выравнивание текста по левому краю
                '&:hover': {
                  bgcolor: '#e0e0e0' // Цвет фона при наведении
                },
                backgroundColor: selectedMonth === index ? '#d0d0d0' : '#f0f0f0' // Цвет фона выбранного месяца
              }}
              onClick={() => onMonthChange({ target: { value: index } } as SelectChangeEvent<number>)}
            >
              {month} 
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default MonthSelectorModal;