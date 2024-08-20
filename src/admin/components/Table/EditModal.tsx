import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { TableData } from './types';
import axiosInstance, { updateUser } from '../../../utils/libs/axios';

interface EditModalProps {
  open: boolean;
  data: TableData | null;
  onClose: () => void;
  onSave: (updatedData: TableData) => void;
}

export interface Department {
  id: number;
  name: string;
}

export interface Position {
  id: number;
  name: string;
  department_id: number;
  department: string;
}

const EditModal: React.FC<EditModalProps> = ({ open, data, onClose, onSave }) => {
  const [formData, setFormData] = useState<TableData | null>(data);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
    fetchDepartments();
    fetchPositions();
  }, [data]);

  const fetchDepartments = async () => {
    try {
      const response = await axiosInstance().get('/department/list');
      if (response.data.status) {
        setDepartments(response.data.data.results);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchPositions = async () => {
    try {
      const response = await axiosInstance().get('/position/list');
      if (response.data.status) {
        setPositions(response.data.data.results);
      }
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    if (formData) {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name as string]: value,
      });
    }
  };

  const handleSave = async () => {
    if (formData) {
      try {
        await updateUser(
          formData.id,             // ID пользователя
          formData.employee_id!,     // Employee ID
          formData.password!,        // Пароль
          formData.role!,            // Роль
          formData.full_name,       // Полное имя
          formData.department_id!,   // ID департамента
          formData.position_id!,     // ID позиции
          formData.phone!,           // Телефон
          formData.email!            // Email
        );
        onSave(formData);
        onClose();
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  if (!formData) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Edit Employee
        </Typography>
        <TextField
          label="Full Name"
          name="full_name"
          value={formData.full_name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel shrink={Boolean(formData.role)}>Role</InputLabel>
          <Select
            name="role"
            value={formData.role || ""}
            onChange={handleSelectChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Employee">Employee</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel shrink={Boolean(formData.department)}>
            Department
          </InputLabel>
          <Select
            name="department"
            value={formData.department || ""}
            onChange={handleSelectChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {departments.map((department) => (
              <MenuItem key={department.id} value={department.name}>
                {department.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel shrink={Boolean(formData.position)}>Position</InputLabel>
          <Select
            name="position"
            value={formData.position || ""}
            onChange={handleSelectChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {positions.map((position) => (
              <MenuItem key={position.id} value={position.name}>
                {position.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />

        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default EditModal;