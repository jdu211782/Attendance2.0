import React, { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  Paper,
  TablePagination,
  TextField,
  InputAdornment,
  Box,
  Typography,
  IconButton,
  Modal,
  Button,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { TableData, Column, FilterState } from "./types";
import AttendanceTableHead from "./AttendanceTableHead";
import AttendanceTableBody from "./AttendanceTableBody";
import CalendarModal from "./CalendarModal";

interface AttendanceTableProps {
  initialData: TableData[];
  columns: Column[];
  onEdit?: (item: TableData) => void;
  onDelete?: (id: string) => void;
  tableTitle?: string;
  showCalendar?: boolean;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({
  initialData,
  columns,
  onEdit,
  onDelete,
  tableTitle,
  showCalendar = true
}) => {
  const [data, setData] = useState<TableData[]>(initialData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterState>({});
  const [filteredData, setFilteredData] = useState<TableData[]>(data);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [pendingSearch, setPendingSearch] = useState(""); // Новое состояние для отслеживания значения поиска

  useEffect(() => {
    const filtered = data.filter((row) => {
      const matchesSearch = 
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return row[key as keyof TableData]?.toString().toLowerCase() === value.toLowerCase();
      });

      return matchesSearch && matchesFilters;
    });

    setFilteredData(filtered);
    setPage(0);
  }, [data, searchTerm, filters]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPendingSearch(event.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchTerm(pendingSearch);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleFilterChange = (columnId: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [columnId]: value
    }));
  };

  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleStatusChange = (rowId: string, newStatus: string) => {
    setData(prevData =>
      prevData.map(row =>
        row.id === rowId ? { ...row, status: capitalize(newStatus) } : row
      )
    );
  };

  const handleCalendarOpen = () => {
    setCalendarOpen(true);
  };

  const handleCalendarClose = () => {
    setCalendarOpen(false);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 4, mb: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2}}>
        <Typography variant="h6">{tableTitle || "Attendance Overview"}</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", }}>
          {showCalendar && (
            <IconButton onClick={handleCalendarOpen}>
              <CalendarTodayIcon />
            </IconButton>
          )}
          <TextField
            variant="outlined"
            size="small"
            placeholder="Quick Search..."
            value={pendingSearch}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: '75%' }}
          />
          <Button onClick={handleSearchSubmit} variant="contained" sx={{ ml: 1, width: '20%', bgcolor:'#111111', fontSize: '12px'}}>
            Search
          </Button>
        </Box>
      </Box>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <AttendanceTableHead columns={columns} filters={filters} onFilterChange={handleFilterChange} />
          <AttendanceTableBody
            columns={columns}
            filteredData={filteredData}
            onStatusChange={handleStatusChange}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal open={isCalendarOpen} onClose={handleCalendarClose}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", p: 4, borderRadius: 2 }}>
          <CalendarModal onClose={handleCalendarClose} />
        </Box>
      </Modal>
    </Paper>
  );
};

export default AttendanceTable;
