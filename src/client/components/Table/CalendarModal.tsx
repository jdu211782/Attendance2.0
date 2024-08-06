import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface CalendarModalProps {
  onClose: () => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null | undefined>(undefined);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Typography variant="h6">Выберите дату</Typography>
        <DatePicker
          label="Дата"
          value={selectedDate}
          onChange={handleDateChange}
          slotProps={{ textField: { fullWidth: true } }}
        />
        <Button onClick={onClose}>Закрыть</Button>
      </Box>
    </LocalizationProvider>
  );
};

export default CalendarModal;
