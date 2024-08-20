import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttendanceTable from './AttendanceTable';
import { TableData, Column } from './types';

const API_URL = 'https://attendance-backend-24xu.onrender.com/api/v1/attendance/list';

const columns: Column[] = [

  { id: "full_name", label: "Name" },
  { id: "work_day", label: "Date" },
  { id: "status", label: "Status" },
];

const AttendanceDataProvider: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState<TableData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No access token found');
      }
      const headers = {
        'Authorization': `Bearer ${token}`,
      };
      const response = await axios.get(API_URL, { headers });
      setAttendanceData(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Failed to fetch attendance data: ${err.response?.data?.message || err.message}`);
      } else {
        setError('An unexpected error occurred while fetching attendance data');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (item: TableData) => {
    try {
      setError(null);
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No access token found');
      }
      const headers = {
        'Authorization': `Bearer ${token}`,
      };
      await axios.put(`${API_URL}/${item.id}`, item, { headers });
      await fetchAttendanceData();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Failed to edit attendance data: ${err.response?.data?.message || err.message}`);
      } else {
        setError('An unexpected error occurred while editing attendance data');
      }
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError(null);
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No access token found');
      }
      const headers = {
        'Authorization': `Bearer ${token}`,
      };
      await axios.delete(`${API_URL}/${id}`, { headers });
      await fetchAttendanceData();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Failed to delete attendance data: ${err.response?.data?.message || err.message}`);
      } else {
        setError('An unexpected error occurred while deleting attendance data');
      }
      console.error(err);
    }
  };

  return (
    <div>
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}
      <AttendanceTable
              columns={columns}
              data={attendanceData}
              onEdit={handleEdit}
              onDelete={handleDelete}
              tableTitle=" "
              showCalendar={false}
              isLoading={isLoading} error={null}/>
    </div>
  );
};

export default AttendanceDataProvider;