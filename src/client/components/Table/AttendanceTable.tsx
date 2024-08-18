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
  columns: Column[];
  data: TableData[];
  onEdit?: (item: TableData) => void;
  onDelete?: (id: string) => void;
  tableTitle?: string;
  showCalendar?: boolean;
  isLoading: boolean;
  error: string | null;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({
  columns,
  data,
  onEdit,
  onDelete,
  tableTitle,
  showCalendar = true,
  isLoading,
  error
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterState>({});
  const [filteredData, setFilteredData] = useState<TableData[]>([]);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [pendingSearch, setPendingSearch] = useState("");

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

  const handleCalendarOpen = () => {
    setCalendarOpen(true);
  };

  const handleCalendarClose = () => {
    setCalendarOpen(false);
  };

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

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
            filteredData={filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
            onStatusChange={(rowId, newStatus) => {}}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Table>
      </TableContainer>
      {/* {filteredData.length === 0 && !isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Typography>No data available</Typography>
        </Box>
      )} */}
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