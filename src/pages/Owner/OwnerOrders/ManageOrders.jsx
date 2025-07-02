"use client"

import { useState } from "react"
import Sidebar from "../OwnerSidebar/OwnerSidebar.jsx"
import "./ManageOrders.css"
import "./OrderDetailModal.css"
import OrderDetailModal from "./OrderDetailModal.jsx"

// Modal chỉnh sửa trạng thái đơn hàng
const EditStatusModal = ({ order, onClose, onSave }) => {
  const [newStatus, setNewStatus] = useState(order.status)

  const handleSave = () => {
    onSave({ ...order, status: newStatus })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Order Status</h2>
        <p><strong>Order ID:</strong> #{order.id}</p>
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "16px" }}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button className="close-btn" onClick={handleSave} style={{ marginTop: "20px" }}>
          Save
        </button>
      </div>
    </div>
  )
}

const ManageOrders = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [editingOrder, setEditingOrder] = useState(null)

  const [orderList, setOrderList] = useState([
    {
      id: 1001,
      customer: "Alice Johnson",
      phone: "123-456-7890",
      address: "123 Main St, Cityville",
      orderDate: "2025-06-30",
      payment: "Credit Card",
      discountCode: "VEGAN10",
      items: "Veggie Burger, Salad",
      total: 24.99,
      status: "Pending",
      time: "10:30 AM",
    },
    {
      id: 1002,
      customer: "Bob Smith",
      phone: "234-567-8901",
      address: "456 Elm St, Townsville",
      orderDate: "2025-06-29",
      payment: "Cash",
      discountCode: "",
      items: "Pasta Primavera, Juice",
      total: 18.5,
      status: "Completed",
      time: "11:15 AM",
    },
    {
      id: 1003,
      customer: "Carol Davis",
      phone: "345-678-9012",
      address: "789 Oak St, Villagetown",
      orderDate: "2025-06-29",
      payment: "Mobile Wallet",
      discountCode: "HEALTHY5",
      items: "Buddha Bowl, Smoothie",
      total: 22.75,
      status: "In Progress",
      time: "11:45 AM",
    },
    {
      id: 1004,
      customer: "David Wilson",
      phone: "456-789-0123",
      address: "321 Maple Ave, Countryside",
      orderDate: "2025-06-28",
      payment: "Credit Card",
      discountCode: "",
      items: "Quinoa Salad, Tea",
      total: 16.25,
      status: "Cancelled",
      time: "12:00 PM",
    },
    {
      id: 1005,
      customer: "Eva Brown",
      phone: "567-890-1234",
      address: "654 Pine Rd, Forestville",
      orderDate: "2025-06-28",
      payment: "Cash",
      discountCode: "SUMMER20",
      items: "Veggie Wrap, Soup",
      total: 19.99,
      status: "Pending",
      time: "12:15 PM",
    },
  ])

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

  const filteredOrders = orderList.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm)
    const matchesStatus = statusFilter === "All" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusSave = (updatedOrder) => {
    const updatedList = orderList.map((o) => o.id === updatedOrder.id ? updatedOrder : o)
    setOrderList(updatedList)
  }

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <Sidebar />
        <div className="header-container">
          <div className="header-left" />
        </div>
      </header>

      <div className="dashboard-content main-content">
        <div className="manage-orders">
          {/* Stats */}
          <div className="stats-row">
            {[
              { label: "Total Orders", value: orderList.length, color: "blue" },
              { label: "Pending", value: orderList.filter((o) => o.status === "Pending").length, color: "orange" },
              { label: "Completed", value: orderList.filter((o) => o.status === "Completed").length, color: "green" },
              { label: "Cancelled", value: orderList.filter((o) => o.status === "Cancelled").length, color: "red" },
            ].map((stat, index) => (
              <div key={index} className="mini-stat">
                <div className="mini-stat-value">{stat.value}</div>
                <div className={`mini-stat-label color-${stat.color}`}>{stat.label}</div>
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
                  <div className="select-container">
                    <span className="select-icon">🔽</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="status-select"
                    >
                      <option value="All">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
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
                    <tr key={order.id} className="table-row">
                      <td><div className="order-id">#{order.id}</div></td>
                      <td><div className="customer-name">{order.customer}</div></td>
                      <td><div className="order-items">{order.items}</div></td>
                      <td><div className="order-total">${order.total.toFixed(2)}</div></td>
                      <td>
                        <div className="order-status">
                          <span className="status-icon">{getStatusIcon(order.status)}</span>
                          <span className={`status-badge ${getStatusClass(order.status)}`}>{order.status}</span>
                        </div>
                      </td>
                      <td><div className="order-time">{order.time}</div></td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="action-btn view"
                            title="View Order Details"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <span>👁️</span>
                          </button>
                          <button
                            className="action-btn edit"
                            title="Edit Order"
                            onClick={() => setEditingOrder(order)}
                          >
                            <span>✏️</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <h4>No orders found</h4>
                <p>No orders match your search criteria. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal xem chi tiết */}
      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}

      {/* Modal chỉnh trạng thái */}
      {editingOrder && (
        <EditStatusModal
          order={editingOrder}
          onClose={() => setEditingOrder(null)}
          onSave={handleStatusSave}
        />
      )}
    </div>
  )
}

export default ManageOrders
