"use client"

import { useState } from "react"
import Dashboard from "./pages/dashboard/dashboard"
import ManageStaff from "./pages/ManageStaff"
import ManageOrders from "./pages/ManageOrders"
import ManageCustomers from "./pages/ManageCustomers"
import "./App.css"
// Import your logo
import logo from "./assets/image/Logo.png"

const navigationItems = [
  { id: "Dashboard", label: "Dashboard", icon: "📊" },
  { id: "Manage Staff", label: "Manage Staff", icon: "👥" },
  { id: "Manage Orders", label: "Manage Orders", icon: "🛒" },
  { id: "Manage Customers", label: "Manage Customers", icon: "👤" },
]

function App() {
  const [currentPage, setCurrentPage] = useState("Dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderPage = () => {
    switch (currentPage) {
      case "Dashboard":
        return <Dashboard />
      case "Manage Staff":
        return <ManageStaff />
      case "Manage Orders":
        return <ManageOrders />
      case "Manage Customers":
        return <ManageCustomers />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="app-container">
      {/* Mobile sidebar overlay */}
      <div className={`mobile-overlay ${sidebarOpen ? "show" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <img src={logo || "/placeholder.svg"} alt="Vegetarian Restaurant Logo" className="logo-image" />
            <h1 className="sidebar-title">Vegetarian</h1>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="close-btn">
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navigationItems.map((item) => {
              const isActive = currentPage === item.id

              return (
                <li key={item.id} className="nav-item">
                  <button
                    onClick={() => {
                      setCurrentPage(item.id)
                      setSidebarOpen(false)
                    }}
                    className={`nav-button ${isActive ? "active" : ""}`}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <p className="footer-title">Admin Panel</p>
          <p className="footer-subtitle">Restaurant Management System</p>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Top bar */}
        <header className="header">
          <div className="header-content">
            <div className="header-left">
              <button onClick={() => setSidebarOpen(true)} className="menu-btn">
                ☰
              </button>
              <h2 className="page-title">{currentPage}</h2>
            </div>
            <div className="header-right">
              <div>Welcome back, Admin</div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="page-content">
          <div className="content-container">{renderPage()}</div>
        </main>
      </div>
    </div>
  )
}

export default App
