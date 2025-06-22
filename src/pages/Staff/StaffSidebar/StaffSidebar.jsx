"use client"
import { Nav } from "react-bootstrap"
import { useNavigate, useLocation } from "react-router-dom"
import { appTheme } from "../../../constant/color_constants"
import Logo from "../../../assets/image/Logo.png"
const StaffSidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { path: "/staff-dashboard", label: "Dashboard", icon: "📊" },
    { path: "/staff-orders", label: "Order Management", icon: "📋" },
    { path: "/staff-food", label: "Food List", icon: "🍽️" },
    { path: "/staff-support", label: "Customer Support", icon: "🎧" },
    { path: "/staff-profile", label: "Staff Profile", icon: "👤" },
  ]

  const handleNavigation = (path) => {
    navigate(path)
  }

  const handleLogout = () => {
    // Add logout logic here
    navigate("/")
  }

  return (
    <div
      className="d-flex flex-column vh-100 p-3"
      style={{
        backgroundColor: appTheme.primary,
        width: "250px",
        minWidth: "250px",
      }}
    >
      {/* Logo and Title */}
      <div className="d-flex align-items-center mb-4">
        <div
          style={{
            width: 40,
            height: 40,
            backgroundColor: "white",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden", // Đảm bảo logo không bị tràn
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "32px", height: "32px", objectFit: "contain" }}
          />
        </div>
        <div className="ms-3">
          <h5 className="text-white mb-0">STAFF</h5>
        </div>
      </div>

      {/* Navigation Menu */}
      <Nav className="flex-column flex-grow-1">
        {menuItems.map((item, index) => (
          <Nav.Link
            key={index}
            onClick={() => handleNavigation(item.path)}
            className={`text-white mb-2 p-3 rounded ${location.pathname === item.path ? "bg-light bg-opacity-25" : ""}`}
            style={{
              cursor: "pointer",
              transition: "all 0.3s ease",
              border: "none",
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== item.path) {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== item.path) {
                e.target.style.backgroundColor = "transparent"
              }
            }}
          >
            <span className="me-3">{item.icon}</span>
            {item.label}
          </Nav.Link>
        ))}
      </Nav>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="btn w-100 text-white"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "none",
            padding: "12px",
          }}
        >
          <span className="me-2">🚪</span>
          Log Out
        </button>
      </div>
    </div>
  )
}

export default StaffSidebar
