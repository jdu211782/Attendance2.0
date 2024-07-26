export interface Employee {
  id: string;
  username: string;
  password: string;
  name: string;
  photoUrl: string;
  isAdmin: boolean;
  checkInTime: Date | null; 
  checkOutTime: Date | null; 
  location: string;         
  role: string;
  status: 'Present' | 'Absent' | 'EarlyLeave'; // Keep this
  attendanceSummary: {
    earlyLeaves: number;
    absences: number;
    lateIns: number;
    leaves: number;
  };
}

export const employees: Employee[] = [
  {
    id: '1',
    username: 'Cat',
    password: 'cat123',
    name: 'Cat',
    photoUrl: 'images/kotek.png',
    isAdmin: true,
    checkInTime: new Date(),  
    checkOutTime: null, 
    location: 'office',      
    role: 'Administrator',
    status: 'Present',
    attendanceSummary: {
      earlyLeaves: 1,
      absences: 2,
      lateIns: 3,
      leaves: 4
    }
  },
];

