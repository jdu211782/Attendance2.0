import React from 'react';
import AttendanceTable from '../components/Table/AttendanceTable';
import { Column } from '../components/Table/types';

const columns: Column[] = [
  { id: 'id', label: 'ID' },
  { id: 'full_name', label: 'フルネーム', filterable: true },
  { id: 'department', label: '部署', filterable: true, filterValues: ['1ステージ', '2ステージ', '3ステージ', '4ステージ'] },
  { id: 'position', label: '役職', filterable: true, filterValues: ['開発者', 'マーケター', 'クラウドエンジニア', 'ソフトウェアエンジニア', 'CEO'] },
  { id: 'work_day', label: '勤務日' },
  { id: 'status', label: '状態', filterable: true, filterValues: ['出席', '欠席'] },
  { id: 'come_time', label: '出勤時間' },
  { id: 'leave_time', label: '退勤時間' },
  { id: 'total_hourse', label: '総労働時間' },
] as Column[];

const BigTablePage: React.FC = () => {
  return (
    <AttendanceTable
      columns={columns}
      showCalendar={false}  // или true, в зависимости от необходимости
      tableTitle="DashboardTable"
      width="100%"
      height="90%"
    />
  );
};

export default BigTablePage;
