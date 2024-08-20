// src/admin/components/Table/types.ts

export type DateOrString = Date | string | number | undefined;

export interface FilterState {
    [key: string]: string;
  }

  export interface TableData {
    id: string;
    full_name: string;
    department: string;
    position?: string;
    work_day?: DateOrString;
    status?: string;
    come_time?: DateOrString;
    leave_time?: DateOrString;
    total_hourse?: number;
    phone?: string;
    email?: string;
  }

  export interface Column {
    id: keyof TableData | 'action';
    label: string;
    filterable?: boolean;
    filterValues?: string[];
  }

 