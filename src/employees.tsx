export interface Employee {
  username: string;
  password: string;
  name: string;
  photoUrl: string;
  isAdmin: boolean;
  checkInTime: Date | null;
  checkOutTime: Date | null;
}

export const employees: Employee[] = [
  {
    username: 'Cat',
    password: 'cat123',
    name: 'Cat',
    photoUrl: 'images/kotek.png',
    isAdmin: true,
    checkInTime: new Date(),  
    checkOutTime: null,       
  },
];

