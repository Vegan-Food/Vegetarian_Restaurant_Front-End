"use client"

import { useState, useEffect } from "react"
import Sidebar from "../OwnerSidebar/OwnerSidebar.jsx"
import StaffViewModal from "./StaffViewModal"
import StaffEditModal from "./StaffEditModal"
import "./ManageStaff.css"
import "./StaffModal.css"
import { getEmployees, createEmployee } from "../../../api/user";

const ManageStaff = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [staffMembers, setStaffMembers] = useState([])

  const [selectedStaff, setSelectedStaff] = useState(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Thêm state để điều khiển modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
    phoneNumber: "",
    address: ""
  });

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await getEmployees();
        setStaffMembers(data);
      } catch (err) {
        console.error("Error fetching staff:", err);
      }
    };
    fetchStaff();
  }, []);

  const handleView = (staff) => {
    setSelectedStaff(staff)
    setIsViewModalOpen(true)
  }

  // const handleEdit = (staff) => {
  //   setSelectedStaff(staff)
  //   setIsEditModalOpen(true)
  // }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      setStaffMembers((prev) => prev.filter((staff) => staff.userId !== id))
    }
  }

  const handleUpdate = (updatedStaff) => {
    const updatedList = staffMembers.map((staff) =>
      staff.userId === updatedStaff.userId ? updatedStaff : staff
    )
    setStaffMembers(updatedList)
    setIsEditModalOpen(false)
  }

  const filteredStaff = staffMembers.filter((staff) => {
    console.log(staff);

    return [staff.userId, staff.name, staff.email, staff.role, staff.phoneNumber, staff.createdAt, staff.address, staff.dateOfBirth, staff.gender]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  })

  const handleOpenAddModal = () => {
    setNewEmployee({
      name: "",
      email: "",
      password: "",
      role: "staff",
      phoneNumber: "",
      address: ""
    });
    setIsAddModalOpen(true);
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await createEmployee(newEmployee);
      alert('Add employee successfully!');
      window.location.reload();
    } catch (err) {
      alert('Add employee failed!');
      console.error('Add employee error:', err);
    }
  };

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
            <button className="add-btn" onClick={handleOpenAddModal}>
              <span className="add-icon">➕</span> Add Employee
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
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {filteredStaff.map((staff) => (
                    <tr key={staff.userId} className="table-row">
                      <td>
                        <div className="user-id">{staff.userId}</div>
                      </td>
                      <td>
                        <div className="user-name">{staff.name}</div>
                      </td>
                      <td>{staff.role || 'N/A'}</td>
                      <td>
                        <div className="user-info">
                          <div className="user-email">{staff.email}</div>
                        </div>
                      </td>
                      <td>
                        <div className="user-info">
                          <div className="user-phone">{staff.phoneNumber}</div>
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn view" onClick={() => handleView(staff)}>👁️</button>
                          <button className="action-btn delete" onClick={() => handleDelete(staff.userId)}>🗑️</button>
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

      {isAddModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h2>Add New Employee</h2>
            <form onSubmit={handleAddEmployee}>
              <div className="form-group">
                <label>Name</label>
                <input value={newEmployee.name} onChange={e => setNewEmployee({ ...newEmployee, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={newEmployee.email} onChange={e => setNewEmployee({ ...newEmployee, email: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={newEmployee.password} onChange={e => setNewEmployee({ ...newEmployee, password: e.target.value })} required />
              </div>
              <div className="form-group" style={{ marginBottom: 20 }}>
                <label style={{ marginBottom: 6, fontWeight: 500 }}>Role</label>
                <select
                  value={newEmployee.role}
                  onChange={e => setNewEmployee({ ...newEmployee, role: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid #d1d5db',
                    fontSize: 16,
                    background: '#f8fafc'
                  }}
                >
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input value={newEmployee.phoneNumber} onChange={e => setNewEmployee({ ...newEmployee, phoneNumber: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input value={newEmployee.address} onChange={e => setNewEmployee({ ...newEmployee, address: e.target.value })} />
              </div>
              <div className="modal-actions center" style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
                <button
                  type="button"
                  className="btn-modal-close"
                  style={{
                    background: '#2563eb',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '10px 32px',
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: 'pointer'
                  }}
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-modal-save"
                  style={{
                    background: '#347928',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '10px 32px',
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: 'pointer'
                  }}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageStaff
