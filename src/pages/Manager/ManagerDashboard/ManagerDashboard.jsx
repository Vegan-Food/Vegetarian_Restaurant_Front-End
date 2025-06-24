import React from 'react';
import './ManagerDashboard.css';
import Sidebar from "../ManagerSidebar/ManagerSidebar.jsx"

// Data
const overviewData = [
  { title: "Total Staff", value: 24, change: "+2 from last month", color: "stat-blue" },
  { title: "Active Dishes", value: 156, change: "+8 from last week", color: "stat-green" },
  { title: "Today's Orders", value: 89, change: "+12% compared to yesterday", color: "stat-yellow" },
  { title: "Monthly Revenue", value: "12.5M", change: "+15% compared to last month", color: "stat-purple" },
];

const ordersData = [
  { id: "#ORD001", customer: "Nguyen Van A", items: "Beef Pho, Fish Cake", amount: 150000, status: "Preparing" },
  { id: "#ORD002", customer: "Tran Thi B", items: "Grilled Pork, Spring Rolls", amount: 100000, status: "Completed" },
  { id: "#ORD003", customer: "Le Van C", items: "Chicken Pho, Fish Cake", amount: 130000, status: "Delivering" },
  { id: "#ORD004", customer: "Pham Thi D", items: "Grilled Pork", amount: 55000, status: "Pending Confirmation" },
];

const staffData = [
  { name: "Nguyen Van A", role: "Head Chef", shift: "Morning Shift", status: "Working" },
  { name: "Tran Thi B", role: "Manager", shift: "Afternoon Shift", status: "Working" },
  { name: "Pham Thi D", role: "Cashier", shift: "Evening Shift", status: "Working" },
];

const getStatusClass = (status) => {
  if (status === "Completed" || status === "Working") return "status-success";
  if (status === "Preparing" || status === "Delivering") return "status-warning";
  if (status === "Pending Confirmation") return "status-info";
  return "status-default";
};

const ManagerDashboard = () => {

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="dashboard-main">
        <h3>Overview</h3>
        <p>Monitor daily operational performance.</p>

        <div className="dashboard-stats">
          {overviewData.map((item, index) => (
            <div key={index} className={`dashboard-stat-card ${item.color}`}>
              <div className="dashboard-stat-value">{item.value}</div>
              <div className="dashboard-stat-title">{item.title}</div>
              <div className="dashboard-stat-subtitle">{item.change}</div>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          {/* Orders */}
          <div className="dashboard-card">
            <h4>Recent Orders</h4>
            {ordersData.map((order, idx) => (
              <div key={idx} className="dashboard-order-item">
                <div>
                  <strong>{order.id}</strong> - {order.customer}
                  <div className="dashboard-order-items">{order.items}</div>
                </div>
                <div>
                  <div>{order.amount.toLocaleString()}đ</div>
                  <span className={`badge ${getStatusClass(order.status)}`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Staff */}
          <div className="dashboard-card">
            <h4>Currently Working Staff</h4>
            {staffData.map((person, index) => (
              <div key={index} className="dashboard-staff-item">
                <div>
                  <strong>{person.name}</strong>
                  <div>{person.role} - {person.shift}</div>
                </div>
                <span className={`badge ${getStatusClass(person.status)}`}>{person.status}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManagerDashboard;
