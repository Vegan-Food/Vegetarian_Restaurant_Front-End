"use client"

import { useState } from "react"
import Sidebar from "../OwnerSidebar/OwnerSidebar.jsx"
import "./ManageStaff.css"

const ManageStaff = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const staffMembers = [
    {
      id: 1,
      name: "John Doe",
      position: "Head Chef",
      email: "john@vegetarian.com",
      phone: "+1 234-567-8901",
      status: "Active",
      joinDate: "2023-01-15",
      department: "Kitchen",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Sous Chef",
      email: "jane@vegetarian.com",
      phone: "+1 234-567-8902",
      status: "Active",
      joinDate: "2023-03-20",
      department: "Kitchen",
    },
    {
      id: 3,
      name: "Mike Johnson",
      position: "Server",
      email: "mike@vegetarian.com",
      phone: "+1 234-567-8903",
      status: "Active",
      joinDate: "2023-06-10",
      department: "Service",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      position: "Manager",
      email: "sarah@vegetarian.com",
      phone: "+1 234-567-8904",
      status: "Inactive",
      joinDate: "2022-11-05",
      department: "Management",
    },
  ]

  const filteredStaff = staffMembers.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleLogout = () => {
    localStorage.removeItem("token")
    // navigate("/login")
  }

  return (
    <div className="dashboard-layout">
      {/* Header với Sidebar */}
      <header className="dashboard-header">
        <Sidebar />
        <div className="header-container">
          <div className="header-left">
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-content main-content">
        <div className="manage-staff">
          {/* Add Staff Button */}
          <div className="page-actions">
            <button className="add-btn">
              <span className="add-icon">➕</span>
              Add Staff Member
            </button>
          </div>

          {/* Staff Stats */}
          <div className="stats-row">
            {[
              { label: "Total Staff", value: staffMembers.length, color: "blue" },
              { label: "Active", value: staffMembers.filter((s) => s.status === "Active").length, color: "green" },
              {
                label: "Kitchen Staff",
                value: staffMembers.filter((s) => s.department === "Kitchen").length,
                color: "purple",
              },
              {
                label: "Service Staff",
                value: staffMembers.filter((s) => s.department === "Service").length,
                color: "orange",
              },
            ].map((stat, index) => (
              <div key={index} className="mini-stat">
                <div className="mini-stat-value">{stat.value}</div>
                <div className={`mini-stat-label color-${stat.color}`}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="search-card">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search staff members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Staff List */}
          <div className="table-card">
            <div className="table-container">
              <table className="data-table">
                <thead className="table-header">
                  <tr>
                    <th>STAFF MEMBER</th>
                    <th>POSITION</th>
                    <th>DEPARTMENT</th>
                    <th>CONTACT</th>
                    <th>JOIN DATE</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {filteredStaff.map((staff) => (
                    <tr key={staff.id} className="table-row">
                      <td>
                        <div className="user-info">
                          <div className="user-avatar">
                            {staff.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="user-details">
                            <h4 className="user-name">{staff.name}</h4>
                            <p className="user-id">ID: {staff.id}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="position-info">
                          <span className="position-title">{staff.position}</span>
                        </div>
                      </td>
                      <td>
                        <div className="department-info">
                          <span className={`department-badge dept-${staff.department.toLowerCase()}`}>
                            {staff.department}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="contact-info">
                          <span className="contact-icon">📧</span>
                          <span className="contact-text">{staff.email}</span>
                        </div>
                        <div className="contact-info">
                          <span className="contact-icon">📞</span>
                          <span className="contact-text">{staff.phone}</span>
                        </div>
                      </td>
                      <td>
                        <div className="date-value">{staff.joinDate}</div>
                      </td>
                      <td>
                        <span
                          className={`status-badge ${staff.status === "Active" ? "status-active" : "status-inactive"}`}
                        >
                          {staff.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn view" title="View Staff Details">
                            <span>👁️</span>
                          </button>
                          <button className="action-btn edit" title="Edit Staff">
                            <span>✏️</span>
                          </button>
                          <button className="action-btn delete" title="Delete Staff">
                            <span>🗑️</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredStaff.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">👥</div>
                <h4>No staff members found</h4>
                <p>No staff members match your search criteria. Try adjusting your search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageStaff