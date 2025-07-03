"use client";

import { useNavigate } from "react-router-dom";
import "./OwnerDashboard.css";
import Sidebar from '../OwnerSidebar/OwnerSidebar.jsx';

// --- SVG icons ---
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
      <header className="dashboard-header">
        <Sidebar />
        <div className="header-container">
          <div className="header-left">
            <h1 className="dashboard-title">{pageTitle}</h1>
            {pageSubtitle && <p className="page-subtitle">{pageSubtitle}</p>}
          </div>
        </div>
      </header>

      <div className="dashboard-content main-content">
        {/* Overview Metrics */}
        <section className="overview-section">
          {metrics.map((metric, index) => (
            <div className="overview-card" key={index}>
              <div className="metric-icon-wrapper">
                <div className={`metric-icon icon-${metric.color}`}>{metric.icon}</div>
              </div>
              <div className="metric-content">
                <h3 className="metric-title">{metric.title}</h3>
                <div className="metric-value">{metric.value}</div>
                <div className="metric-trend">
                  <span className={`trend-indicator trend-${metric.trend}`}>
                    {metric.trend === "up" ? <IconTrendingUp /> : <IconTrendingDown />}
                    {metric.change}
                  </span>
                  <span className="trend-period">vs last month</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Revenue Chart */}
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
      </div>
    </div>
  );
};

export default OwnerDashboard;
