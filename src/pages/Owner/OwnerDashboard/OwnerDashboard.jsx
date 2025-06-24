"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OwnerDashboard.css";
import Sidebar from '../OwnerSidebar/OwnerSidebar.jsx';


// SVG icons as components
const IconChart = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="9" y1="8" x2="9" y2="21" />
    <line x1="15" y1="8" x2="15" y2="21" />
    <line x1="3" y1="14" x2="21" y2="14" />
  </svg>
);

const IconDollar = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="2" x2="12" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const IconPercent = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);

const IconTrendingUp = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const IconTrendingDown = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
);

const IconUsers = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconShoppingCart = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const OwnerDashboard = ({ pageTitle = "Dashboard", pageSubtitle = null }) => {
  const navigate = useNavigate();

  const metrics = [
    {
      title: "Net Profit Margin",
      value: "$24.5K",
      change: "+1.2%",
      trend: "up",
      icon: <IconDollar />,
      color: "green",
    },
    {
      title: "Avg Profit Margin",
      value: "9.5%",
      change: "+0.8%",
      trend: "up",
      icon: <IconPercent />,
      color: "blue",
    },
    {
      title: "Return On Investment",
      value: "19.1%",
      change: "+2.4%",
      trend: "up",
      icon: <IconTrendingUp />,
      color: "purple",
    },
    {
      title: "Monthly Revenue",
      value: "$2,176",
      change: "-0.3%",
      trend: "down",
      icon: <IconChart />,
      color: "orange",
    },
  ];

  return (
    <div className="dashboard-layout">

      {/* Full Width Header */}
      <header className="dashboard-header">
        <Sidebar />

        <div className="header-container">
          <div className="header-left">
            <h1 className="dashboard-title">{pageTitle}</h1>
            {pageSubtitle && <p className="page-subtitle">{pageSubtitle}</p>}
          </div>
          <div className="header-right">
            <div className="welcome-badge">Welcome back, Admin</div>
            <button className="logout-btn" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Content Container */}
      <div className="dashboard-content main-content">
        {/* Overview Section */}
        {pageTitle === "Dashboard" && (
          <section className="overview-section">
            <div className="overview-card">
              <div className="metric-icon-wrapper">
                <div className={`metric-icon icon-${metrics[0].color}`}>{metrics[0].icon}</div>
              </div>
              <div className="metric-content">
                <h3 className="metric-title">{metrics[0].title}</h3>
                <div className="metric-value">{metrics[0].value}</div>
                <div className="metric-trend">
                  <span className={`trend-indicator trend-${metrics[0].trend}`}>
                    {metrics[0].trend === "up" ? <IconTrendingUp /> : <IconTrendingDown />}
                    {metrics[0].change}
                  </span>
                  <span className="trend-period">vs last month</span>
                </div>
              </div>
            </div>
            <div className="overview-card">
              <div className="metric-icon-wrapper">
                <div className={`metric-icon icon-${metrics[1].color}`}>{metrics[1].icon}</div>
              </div>
              <div className="metric-content">
                <h3 className="metric-title">{metrics[1].title}</h3>
                <div className="metric-value">{metrics[1].value}</div>
                <div className="metric-trend">
                  <span className={`trend-indicator trend-${metrics[1].trend}`}>
                    {metrics[1].trend === "up" ? <IconTrendingUp /> : <IconTrendingDown />}
                    {metrics[1].change}
                  </span>
                  <span className="trend-period">vs last month</span>
                </div>
              </div>
            </div>
            <div className="overview-card">
              <div className="metric-icon-wrapper">
                <div className={`metric-icon icon-${metrics[2].color}`}>{metrics[2].icon}</div>
              </div>
              <div className="metric-content">
                <h3 className="metric-title">{metrics[2].title}</h3>
                <div className="metric-value">{metrics[2].value}</div>
                <div className="metric-trend">
                  <span className={`trend-indicator trend-${metrics[2].trend}`}>
                    {metrics[2].trend === "up" ? <IconTrendingUp /> : <IconTrendingDown />}
                    {metrics[2].change}
                  </span>
                  <span className="trend-period">vs last month</span>
                </div>
              </div>
            </div>
            <div className="overview-card">
              <div className="metric-icon-wrapper">
                <div className={`metric-icon icon-${metrics[3].color}`}>{metrics[3].icon}</div>
              </div>
              <div className="metric-content">
                <h3 className="metric-title">{metrics[3].title}</h3>
                <div className="metric-value">{metrics[3].value}</div>
                <div className="metric-trend">
                  <span className={`trend-indicator trend-${metrics[3].trend}`}>
                    {metrics[3].trend === "up" ? <IconTrendingUp /> : <IconTrendingDown />}
                    {metrics[3].change}
                  </span>
                  <span className="trend-period">vs last month</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Revenue Overview Section */}
        {pageTitle === "Dashboard" && (
          <section className="orders-section">
            <div className="chart-card">
              <div className="chart-header">
                <h2 className="chart-title">Revenue Overview</h2>
                <p className="chart-subtitle">Monthly performance tracking</p>
              </div>
              <div className="chart-body">
                <div className="chart-placeholder">
                  <IconChart className="chart-icon" />
                  <p className="chart-text">Revenue data visualization</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Bottom Section */}
        {pageTitle === "Dashboard" && (
          <section className="bottom-section">
            <div className="bottom-container">
              <div className="action-card">
                <div className="card-header">
                  <h3 className="card-title">Quick Actions</h3>
                </div>
                <div className="dashboard-card-body">
  <button className="action-btn primary">
    <IconShoppingCart />
    <span>View Recent Orders</span>
  </button>
  <button className="action-btn secondary">
    <IconUsers />
    <span>Manage Staff Schedule</span>
  </button>
  <button className="action-btn secondary">
    <IconChart />
    <span>Generate Reports</span>
  </button>
</div>
              </div>
              <div className="status-card">
                <div className="card-header">
                  <h3 className="card-title">System Status</h3>
                </div>
                <div className="card-body">
                  <div className="status-item">
                    <span className="status-label">Orders Processing</span>
                    <span className="status-badge success">Active</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">Staff Online</span>
                    <span className="status-badge info">12 Members</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">System Health</span>
                    <span className="status-badge success">Excellent</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {pageTitle !== "Dashboard" && (
          <section className="page-content">
            <div className="content-placeholder">
              <p>Content for {pageTitle} page will be displayed here.</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard