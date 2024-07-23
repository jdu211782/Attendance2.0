import React, { useState } from 'react';
import '../../shared/styles/App.css';
import UnstyledTabsVertical from '../components/Tabs';
import DashboardContent from './AdminDashboardContent'; 
import EmptyPage from './EmptyPage';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent<any, Event> | null, newValue: string | number | null) => {
    setActiveTab(newValue as number);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Company X</h1>
      </header>
      <div className="Dashboard">
        <div className="Sidebar">
          <UnstyledTabsVertical onTabChange={handleTabChange} />
        </div>
        <div className="MainContent">
          {activeTab === 0 && <DashboardContent />}
          {activeTab === 1 && <EmptyPage />} 
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
