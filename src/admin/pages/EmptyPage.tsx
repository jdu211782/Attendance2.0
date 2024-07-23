import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { 
    Box, TextField, Select, MenuItem, FormControl,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, TablePagination,
    Tooltip,
} from '@mui/material';
import { styled } from '@mui/system';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Иконка часов

interface Employee {
    id: string;
    name: string;
    checkInTime: Date | null;
    checkOutTime: Date | null;
    status: 'Present' | 'Absent';
}

// Стилизованные компоненты с закругленными углами
const StyledTextField = styled(TextField)(({ theme }) => ({
    borderRadius: '20px', 
    '& .MuiInputBase-root': { borderRadius: '20px' },
    '& .MuiOutlinedInput-notchedOutline': { 
        borderRadius: '20px', 
        borderColor: theme.palette.grey[400], 
    },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
    borderRadius: '20px', 
    '& .MuiSelect-outlined': { borderRadius: '20px' },
    '& .MuiOutlinedInput-notchedOutline': { 
        borderRadius: '20px', 
        borderColor: theme.palette.grey[400], 
    },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
}));

function EmptyPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [filter, setFilter] = useState<'all' | 'present' | 'absent'>('all');
    const [searchId, setSearchId] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        // Генерация случайных данных о сотрудниках (увеличено количество для демонстрации пагинации)
        const randomEmployees: Employee[] = Array.from({ length: 50 }, () => ({ 
            id: uuidv4(),
            name: faker.name.fullName(),
            checkInTime: Math.random() < 0.8 ? faker.date.between('2023-01-01T08:00:00', '2023-01-01T12:00:00') : null,
            checkOutTime: Math.random() < 0.8 ? faker.date.between('2023-01-01T16:00:00', '2023-01-01T18:00:00') : null,
            status: Math.random() < 0.8 ? 'Present' : 'Absent', 
        }));
        setEmployees(randomEmployees);
    }, []);

    // Фильтрация сотрудников по статусу и ID
    const filteredEmployees = employees.filter(employee => {
        if (filter === 'present' && employee.status !== 'Present') return false; 
        if (filter === 'absent' && employee.status !== 'Absent') return false;
        if (searchId && !employee.id.includes(searchId)) return false;
        return true;
    });

    // Пагинация данных
    const paginatedEmployees = filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); 
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Grid container alignItems="center" spacing={2} justifyContent="space-between" sx={{ marginBottom: 2 }}>
                <Grid item>
                    <FormControl>
                        <StyledSelect
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as any)}
                            displayEmpty 
                            inputProps={{ 'aria-label': 'Filter' }}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="present">Present</MenuItem>
                            <MenuItem value="absent">Absent</MenuItem>
                        </StyledSelect>
                    </FormControl>
                </Grid>
                <Grid item>
                    <StyledTextField
                        label="Search by ID"
                        variant="outlined"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        fullWidth
                    />
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ borderRadius: '8px', backgroundColor: 'grey.100' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'grey.300' }}>
                            <TableCell sx={{ fontWeight: 'bold', borderRadius: '8px 0 0 0' }}>Name</TableCell> 
                            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell> 
                            <TableCell sx={{ fontWeight: 'bold' }}>Check-in</TableCell> 
                            <TableCell sx={{ fontWeight: 'bold' }}>Check-out</TableCell> 
                            <TableCell sx={{ fontWeight: 'bold', borderRadius: '0 8px 0 0' }}>Status</TableCell> 
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedEmployees.map((employee, index) => (
                            <TableRow 
                                key={employee.id} 
                                sx={{ 
                                    backgroundColor: index % 2 === 0 ? 'grey.50' : 'white', 
                                    '&:hover': { backgroundColor: 'grey.100' },
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    borderRadius: '8px' 
                                }}
                            >
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.id}</TableCell>
                                <TableCell>{employee.checkInTime ? employee.checkInTime.toLocaleTimeString() : '-'}</TableCell>
                                <TableCell>{employee.checkOutTime ? employee.checkOutTime.toLocaleTimeString() : '-'}</TableCell>
                                <Tooltip title={`Check-in: ${employee.checkInTime ? employee.checkInTime.toLocaleString() : '-'}\nCheck-out: ${employee.checkOutTime ? employee.checkOutTime.toLocaleString() : '-'}`}> 
                                    <TableCell>
                                        <span style={{ color: employee.status === 'Present' ? 'primary.main' : 'warning.main' }}>
                                            {employee.status}
                                        </span>
                                    </TableCell>
                                </Tooltip>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={filteredEmployees.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
}

export default EmptyPage;
