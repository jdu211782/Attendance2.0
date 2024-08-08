import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, Box, TableHead, TableRow, Paper, Button,
} from '@mui/material';
import { Department, Position } from '../pages/DepartmentPositionManagement'; 

interface PositionTableProps {
  positions: Position[];
  departments: Department[];
  onEdit: (position: Position) => void;
  onDelete: (positionId: number) => void;
}

function PositionTable({ positions, departments, onEdit, onDelete }: PositionTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Position Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.map((position) => (
            <TableRow key={position.id}>
              <TableCell>{position.name}</TableCell>
              <TableCell>
                {departments.find(d => d.id === position.departmentId)?.name || 'Unknown'}
              </TableCell>
              <TableCell>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button onClick={() => onEdit(position)} variant="outlined" size='small'>Edit</Button>
                <Button onClick={() => onDelete(position.id)} variant="outlined" size='small' color="error">Delete</Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PositionTable;
