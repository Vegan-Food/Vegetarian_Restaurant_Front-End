"use client"

import { useState } from "react"

const ManageOrders = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const orders = [
    {
      id: 1001,
      customer: "Alice Johnson",
      items: "Veggie Burger, Salad",
      total: 24.99,
      status: "Pending",
      time: "10:30 AM",
    },
    {
      id: 1002,
      customer: "Bob Smith",
      items: "Pasta Primavera, Juice",
      total: 18.5,
      status: "Completed",
      time: "11:15 AM",
    },
    {
      id: 1003,
      customer: "Carol Davis",
      items: "Buddha Bowl, Smoothie",
      total: 22.75,
      status: "In Progress",
      time: "11:45 AM",
    },
    {
      id: 1004,
      customer: "David Wilson",
      items: "Quinoa Salad, Tea",
      total: 16.25,
      status: "Cancelled",
      time: "12:00 PM",
    },
    { id: 1005, customer: "Eva Brown", items: "Veggie Wrap, Soup", total: 19.99, status: "Pending", time: "12:15 PM" },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return "✅"
      case "Pending":
        return "⏳"
      case "In Progress":
        return "🔄"
      case "Cancelled":
        return "❌"
      default:
        return "❓"
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "status-completed"
      case "Pending":
        return "status-pending"
      case "In Progress":
        return "status-progress"
      case "Cancelled":
        return "status-cancelled"
      default:
        return "status-pending"
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || order.id.toString().includes(searchTerm)
    const matchesStatus = statusFilter === "All" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const orderStats = [
    {
      label: "Total Orders",
      value: orders.length,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      label: "Pending",
      value: orders.filter((o) => o.status === "Pending").length,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      label: "Completed",
      value: orders.filter((o) => o.status === "Completed").length,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      label: "Cancelled",
      value: orders.filter((o) => o.status === "Cancelled").length,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Management</h1>
        <p className="text-gray-600">Track and manage customer orders</p>
      </div>

      {/* Order Stats */}
      <div className="stats-row">
        {[
          { label: "Total Orders", value: orders.length, color: "text-blue-600" },
          { label: "Pending", value: orders.filter((o) => o.status === "Pending").length, color: "text-yellow-600" },
          { label: "Completed", value: orders.filter((o) => o.status === "Completed").length, color: "text-green-600" },
          { label: "Cancelled", value: orders.filter((o) => o.status === "Cancelled").length, color: "text-red-600" },
        ].map((stat, index) => (
          <div key={index} className="mini-stat">
            <div className="mini-stat-value">{stat.value}</div>
            <div className={`mini-stat-label ${stat.color}`}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="search-card">
        <div className="filters-container">
          <div className="filter-row">
            <div className="filter-input">
              <div className="search-container">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
            <div className="filter-select">
              <span className="search-icon">🔽</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  paddingLeft: "40px",
                  padding: "8px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  backgroundColor: "white",
                }}
              >
                <option value="All">Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="table-card">
        <div className="table-container">
          <table className="data-table">
            <thead className="table-header">
              <tr>
                <th>ORDER ID</th>
                <th>CUSTOMER</th>
                <th>ITEMS</th>
                <th>TOTAL</th>
                <th>STATUS</th>
                <th>TIME</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div>#{order.id}</div>
                  </td>
                  <td>
                    <div>{order.customer}</div>
                  </td>
                  <td>
                    <div style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>{order.items}</div>
                  </td>
                  <td>
                    <div>${order.total}</div>
                  </td>
                  <td>
                    <div className="order-status">
                      <span>{getStatusIcon(order.status)}</span>
                      <span className={`status-badge ${getStatusClass(order.status)}`}>{order.status}</span>
                    </div>
                  </td>
                  <td>
                    <div>{order.time}</div>
                  </td>
                  <td>
                    <button className="action-btn view">
                      <span>👁️</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No orders found matching your search criteria.</p>
        </div>
      )}
    </div>
  )
}

export default ManageOrders
