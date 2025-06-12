"use client"

import { useState } from "react"

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

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-header-content">
          <div className="page-info">
            <h3>Customer Management</h3>
            <p>Manage your restaurant customers</p>
          </div>
          <button className="add-btn">
            <span>➕</span>
            Add Customer
          </button>
        </div>
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
          { label: "Total Customers", value: customers.length, color: "text-blue-600" },
          {
            label: "Active This Month",
            value: customers.filter((c) => new Date(c.lastOrder) > new Date("2024-01-01")).length,
            color: "text-green-600",
          },
          {
            label: "Average Orders",
            value: Math.round(customers.reduce((acc, c) => acc + c.orders, 0) / customers.length),
            color: "text-purple-600",
          },
          {
            label: "Total Revenue",
            value: `$${customers.reduce((acc, c) => acc + c.totalSpent, 0).toFixed(2)}`,
            color: "text-orange-600",
          },
        ].map((stat, index) => (
          <div key={index} className="mini-stat">
            <div className="mini-stat-value">{stat.value}</div>
            <div className={`mini-stat-label ${stat.color}`}>{stat.label}</div>
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
                <tr key={customer.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="user-details">
                        <h4>{customer.name}</h4>
                        <p>ID: {customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <span>📧</span>
                      {customer.email}
                    </div>
                    <div className="contact-info">
                      <span>📞</span>
                      {customer.phone}
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <span>📍</span>
                      <span style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {customer.address}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div>{customer.orders}</div>
                  </td>
                  <td>
                    <div>${customer.totalSpent.toFixed(2)}</div>
                  </td>
                  <td>
                    <div>{customer.lastOrder}</div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit">
                        <span>✏️</span>
                      </button>
                      <button className="action-btn delete">
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
  )
}

export default ManageCustomers
