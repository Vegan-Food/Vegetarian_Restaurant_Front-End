"use client"

import { useState } from "react"
import Sidebar from "../OwnerSidebar/OwnerSidebar.jsx"
import "./ManageCustomers.css"

const ManageCustomers = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const customers = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@email.com",
      phone: "+1 234-567-8901",
      address: "123 Main St, City",
      orders: 15,
      totalSpent: 245.5,
      lastOrder: "2024-01-15",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@email.com",
      phone: "+1 234-567-8902",
      address: "456 Oak Ave, City",
      orders: 8,
      totalSpent: 156.75,
      lastOrder: "2024-01-14",
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@email.com",
      phone: "+1 234-567-8903",
      address: "789 Pine Rd, City",
      orders: 22,
      totalSpent: 389.25,
      lastOrder: "2024-01-16",
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david@email.com",
      phone: "+1 234-567-8904",
      address: "321 Elm St, City",
      orders: 5,
      totalSpent: 89.99,
      lastOrder: "2024-01-10",
    },
  ]

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
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
            <h1 className="dashboard-title">Customer Management</h1>
            <p className="page-subtitle">Manage your restaurant customers</p>
          </div>
          <div className="header-right">
            <div className="welcome-badge">Welcome back, Admin</div>
            <button className="logout-btn" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-content main-content">
        <div className="manage-customers">
          {/* Add Customer Button */}
          <div className="page-actions">
            <button className="add-btn">
              <span className="add-icon">➕</span>
              Add Customer
            </button>
          </div>

          {/* Search */}
          <div className="search-card">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Customer Stats */}
<div className="stats-row">
            {[
              { label: "Total Customers", value: customers.length, color: "blue" },
              {
                label: "Active This Month",
                value: customers.filter((c) => new Date(c.lastOrder) > new Date("2024-01-01")).length,
                color: "green",
              },
              {
                label: "Average Orders",
                value: Math.round(customers.reduce((acc, c) => acc + c.orders, 0) / customers.length),
                color: "purple",
              },
              {
                label: "Total Revenue",
                value: `$${customers.reduce((acc, c) => acc + c.totalSpent, 0).toFixed(2)}`,
                color: "orange",
              },
            ].map((stat, index) => (
              <div key={index} className="mini-stat">
                <div className="mini-stat-value">{stat.value}</div>
                <div className={`mini-stat-label color-${stat.color}`}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Customer List */}
          <div className="table-card">
            <div className="table-container">
              <table className="data-table">
                <thead className="table-header">
                  <tr>
                    <th>Customer</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Orders</th>
                    <th>Total Spent</th>
                    <th>Last Order</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="table-row">
                      <td>
                        <div className="user-info">
                          <div className="user-avatar">
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="user-details">
                            <h4 className="user-name">{customer.name}</h4>
                            <p className="user-id">ID: {customer.id}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="contact-info">
                          <span className="contact-icon">📧</span>
                          <span className="contact-text">{customer.email}</span>
                        </div>
                        <div className="contact-info">
                          <span className="contact-icon">📞</span>
                          <span className="contact-text">{customer.phone}</span>
                        </div>
                      </td>
                      <td>
<div className="contact-info">
                          <span className="contact-icon">📍</span>
                          <span className="contact-text address-text">{customer.address}</span>
                        </div>
                      </td>
                      <td>
                        <div className="stat-value">{customer.orders}</div>
                      </td>
                      <td>
                        <div className="money-value">${customer.totalSpent.toFixed(2)}</div>
                      </td>
                      <td>
                        <div className="date-value">{customer.lastOrder}</div>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn edit" title="Edit Customer">
                            <span>✏️</span>
                          </button>
                          <button className="action-btn delete" title="Delete Customer">
                            <span>🗑️</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageCustomers