"use client"

import { useState } from "react"
import Sidebar from "../OwnerSidebar/OwnerSidebar.jsx"
import StaffViewModal from "./StaffViewModal"
import StaffEditModal from "./StaffEditModal"
import "./ManageStaff.css"
import "./StaffModal.css"

const ManageStaff = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [staffMembers, setStaffMembers] = useState([
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
  ])

  const [selectedStaff, setSelectedStaff] = useState(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleView = (staff) => {
    setSelectedStaff(staff)
    setIsViewModalOpen(true)
  }

  const handleEdit = (staff) => {
    setSelectedStaff(staff)
    setIsEditModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      setStaffMembers((prev) => prev.filter((staff) => staff.id !== id))
    }
  }

  const handleUpdate = (updatedStaff) => {
    const updatedList = staffMembers.map((staff) =>
      staff.id === updatedStaff.id ? updatedStaff : staff
    )
    setStaffMembers(updatedList)
    setIsEditModalOpen(false)
  }

  const filteredStaff = staffMembers.filter((staff) =>
    [staff.name, staff.position, staff.department]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <Sidebar />
        <div className="header-container" />
      </header>

      <main className="dashboard-content main-content">
        <div className="manage-staff">
          {/* Action Button */}
          <div className="page-actions">
            <button className="add-btn">
              <span className="add-icon">➕</span> Add Staff Member
            </button>
          </div>

          {/* Staff Stats */}
          <div className="stats-row">
            {[
              { label: "Total Staff", value: staffMembers.length, color: "blue" },
              {
                label: "Active",
                value: staffMembers.filter((s) => s.status === "Active").length,
                color: "green",
              },
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
            ].map((stat, i) => (
              <div key={i} className="mini-stat">
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

          {/* Staff Table */}
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
                      <td>{staff.position}</td>
                      <td>{staff.department}</td>
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
                      <td>{staff.joinDate}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            staff.status === "Active" ? "status-active" : "status-inactive"
                          }`}
                        >
                          {staff.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn view" onClick={() => handleView(staff)}>👁️</button>
                          <button className="action-btn edit" onClick={() => handleEdit(staff)}>✏️</button>
                          <button className="action-btn delete" onClick={() => handleDelete(staff.id)}>🗑️</button>
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
                <p>No staff match your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* View Modal */}
      {isViewModalOpen && selectedStaff && (
        <StaffViewModal staff={selectedStaff} onClose={() => setIsViewModalOpen(false)} />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedStaff && (
        <StaffEditModal
          staff={selectedStaff}
          onUpdate={handleUpdate}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  )
}

export default ManageStaff
