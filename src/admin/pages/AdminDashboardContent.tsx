import React from 'react';
import LineChartComponent from '../components/LineChart';
import PieChartWithCustomizedLabel from '../components/pie';

function AdminDashboardContent() {
  return (
    <>
      <div className="Cards">
        <div className="Card">Total Employees: </div>
        <div className="Card">On Time: </div>
        <div className="Card">Absent: </div>
        <div className="Card">Late Arrival: </div>
        <div className="Card">Early Departures: </div>
        <div className="Card">Time-off: </div>
      </div>
      <div className="Charts">
        <div className="Chart-1">
          <p>Attendance Chart</p>
          <div className="Chart-content">
            <LineChartComponent />
          </div>
        </div>
        <div className="Chart-2">
          <p>Who is at work</p>
          <div className="Chart-content">
            <PieChartWithCustomizedLabel />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboardContent;
