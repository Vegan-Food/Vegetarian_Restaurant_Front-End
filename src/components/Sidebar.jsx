"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Logo from "../assets/image/Logo.png"
import "./Sidebar.css"

// Icon components
const Home = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </svg>
)

const ClipboardList = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4" />
    <path d="M12 16h4" />
    <path d="M8 11h.01" />
    <path d="M8 16h.01" />
  </svg>
)

const Headphones = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
  </svg>
)

const UtensilsCrossed = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
)

const User = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const LogOut = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16,17 21,12 16,7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
)

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeItem, setActiveItem] = useState(location.pathname)

  const handleItemClick = (path) => {
    setActiveItem(path)
    navigate(path)
  }

  const handleLogout = () => {
    localStorage.removeItem("staffToken")
    navigate("/logout")
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <img
            src={Logo}
            alt="Logo"
            className="logo"
            onError={(e) => {
                e.target.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23FCCD2A'/%3E%3Ctext x='20' y='25' textAnchor='middle' fill='%23347928' fontSize='16' fontWeight='bold'%3EL%3C/text%3E%3C/svg%3E"
            }}
            />
          <div className="brand-info">
            <span className="user-role">Staff</span>
          </div>
        </div>
      </div>
      <nav>
        <ul>
          <li
            className={`menu-item ${activeItem === "/dashboard" ? "active" : ""}`}
            onClick={() => handleItemClick("/dashboard")}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </li>
          <li
            className={`menu-item ${activeItem === "/orders" ? "active" : ""}`}
            onClick={() => handleItemClick("/orders")}
          >
            <ClipboardList size={20} />
            <span>Orders</span>
          </li>
          <li
            className={`menu-item ${activeItem === "/support" ? "active" : ""}`}
            onClick={() => handleItemClick("/support")}
          >
            <Headphones size={20} />
            <span>Support Requests</span>
          </li>
          <li
            className={`menu-item ${activeItem === "/food" ? "active" : ""}`}
            onClick={() => handleItemClick("/food")}
          >
            <UtensilsCrossed size={20} />
            <span>Food Management</span>
          </li>
          <li
            className={`menu-item ${activeItem === "/profile" ? "active" : ""}`}
            onClick={() => handleItemClick("/profile")}
          >
            <User size={20} />
            <span>My Profile</span>
          </li>
        </ul>

        {/* Logout button */}
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </nav>
    </aside>
  )
}

export default Sidebar
