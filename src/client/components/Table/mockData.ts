import { TableData } from "./types";

const mockData: TableData[] = [
  {
    id: '1',
    full_name: 'John Doe',
    department: 'IT',
    position: 'Developer',
    work_day: new Date('2024-07-01T00:00:00Z'), // Пример даты
    status: 'Present',
    come_time: new Date('2024-07-01T09:00:00Z'), // Пример времени
    leave_time: new Date('2024-07-01T17:00:00Z'), // Пример времени
    total_hourse: 8 // Пример суммарных часов
  },
];

export default mockData;
