"use client"

import { useState } from "react"
import Sidebar from "../ManagerSidebar/Sidebar.jsx"
import "./ManagerOrderList.css"

const sampleOrders = [
  {
    order_id: "DH001",
    name: "Võ Chiêu Quân",
    food: "Bún chay, Gỏi cuốn chay",
    total_amount: 90000,
    status: "preparing",
    time: "10:30",
    phone_number: "0912345678",
    address: "123 Nguyễn Văn Linh, Quận 7, TP.HCM",
    method: "Cash",
    order_date: "2025-06-10 09:00:00",
    payment_method: "Cash",
    payment_id: 123456,
    customer_id: 1,
    created_at: "2025-06-10 08:55:00",
    discount_id: 2,
    notes: "Giao hàng trước 12h trưa",
  },
  {
    order_id: "DH002",
    name: "Trần Thị Mai",
    food: "Cơm tấm chay, Canh rong biển",
    total_amount: 110000,
    status: "delivered",
    time: "11:00",
    phone_number: "0933222111",
    address: "456 Lê Văn Việt, Quận 9, TP.HCM",
    method: "VNPAY",
    order_date: "2025-06-10 08:30:00",
    payment_method: "VNPAY",
    payment_id: 654321,
    customer_id: 2,
    created_at: "2025-06-10 08:25:00",
    discount_id: null,
    notes: "",
  },
  {
    order_id: "DH003",
    name: "Lê Văn Nam",
    food: "Phở chay, Chả cá chay",
    total_amount: 85000,
    status: "pending",
    time: "09:15",
    phone_number: "0987654321",
    address: "789 Võ Văn Tần, Quận 3, TP.HCM",
    method: "Cash",
    order_date: "2025-06-10 07:45:00",
    payment_method: "Cash",
    payment_id: 789012,
    customer_id: 3,
    created_at: "2025-06-10 07:40:00",
    discount_id: 1,
    notes: "Không cay",
  },
]

const statusLabels = {
  pending: "Pending",
  preparing: "Preparing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
}

const ManagerOrderList = () => {
  const [orders, setOrders] = useState(sampleOrders)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderToUpdate, setOrderToUpdate] = useState(null)
  const [activeFilter, setActiveFilter] = useState("all")
  const [newStatus, setNewStatus] = useState("")

  const handleUpdateStatusClick = (order) => {
    setOrderToUpdate(order)
    setNewStatus(order.status)
  }

  const handleDetailsClick = (order) => {
    setSelectedOrder(order)
  }

  const filteredOrders = activeFilter === "all" ? orders : orders.filter((order) => order.status === activeFilter)

  const handleStatusUpdate = (e) => {
    e.preventDefault()
    const updatedOrders = orders.map((order) =>
      order.order_id === orderToUpdate.order_id ? { ...order, status: newStatus } : order,
    )
    setOrders(updatedOrders)
    setOrderToUpdate(null)
    alert("Order status updated successfully!")
  }

  const getStatusCount = (status) => {
    return orders.filter((order) => order.status === status).length
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <div className="order-management-header">
          <div className="header-content">
            <h3>Order Management</h3>
            <p>Manage and monitor restaurant orders</p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-number">{orders.length}</span>
              <span className="stat-label">Total Orders</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{getStatusCount("pending")}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{getStatusCount("preparing")}</span>
              <span className="stat-label">Preparing</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{getStatusCount("delivered")}</span>
              <span className="stat-label">Delivered</span>
            </div>
          </div>
        </div>

        <div className="order-filters">
          {["all", "pending", "preparing", "shipped", "delivered", "cancelled"].map((status) => (
            <button
              key={status}
              className={`filter-btn ${activeFilter === status ? "active" : ""}`}
              onClick={() => setActiveFilter(status)}
            >
              {status === "all" ? "All" : statusLabels[status]}
              {status !== "all" && <span className="filter-count">({getStatusCount(status)})</span>}
            </button>
          ))}
        </div>

        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Food Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index}>
                <td>
                  <span className="order-id">#{order.order_id}</span>
                </td>
                <td>
                  <div className="customer-info">
                    <span className="customer-name">{order.name}</span>
                    <span className="customer-phone">{order.phone_number}</span>
                  </div>
                </td>
                <td>
                  <span className="food-items">{order.food}</span>
                </td>
                <td className="price-cell">{order.total_amount.toLocaleString()}đ</td>
                <td>
                  <span className={`badge status-${order.status}`}>{statusLabels[order.status] || order.status}</span>
                </td>
                <td>
                  <span className="time-cell">{order.time}</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="detail-btn" onClick={() => handleDetailsClick(order)} title="View Details">
                      Detail
                    </button>
                    <button className="edit-btn" onClick={() => handleUpdateStatusClick(order)} title="Update Status">
                      Update Status
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="empty-state">
            <div className="empty-content">
              <div className="empty-icon">📋</div>
              <h4>No orders found</h4>
              <p>No orders match the selected filter</p>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {selectedOrder && (
          <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
            <div className="modal-content details-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div className="header-info">
                  <h4>Order Details</h4>
                  <span className="order-id-badge">#{selectedOrder.order_id}</span>
                </div>
                <button className="close-btn" onClick={() => setSelectedOrder(null)}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="unified-details-panel">
                  {/* Top Row - Compact Sections */}
                  <div className="compact-sections-row">
                    {/* Customer Information Section */}
                    <div className="compact-section">
                      <div className="section-header">
                        <span className="section-icon">👤</span>
                        <h5>Customer Information</h5>
                      </div>
                      <div className="compact-content">
                        <div className="info-item">
                          <span className="info-label">Name:</span>
                          <span className="info-value customer-name">{selectedOrder.name}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Phone:</span>
                          <span className="info-value">{selectedOrder.phone_number}</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Total Section */}
                    <div className="compact-section">
                      <div className="section-header">
                        <span className="section-icon">💰</span>
                        <h5>Order Total</h5>
                      </div>
                      <div className="compact-content">
                        <div className="info-item">
                          <span className="info-label">Amount:</span>
                          <span className="info-value order-amount">
                            {selectedOrder.total_amount.toLocaleString()}đ
                          </span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Payment:</span>
                          <span className="info-value">{selectedOrder.payment_method}</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Status Section */}
                    <div className="compact-section">
                      <div className="section-header">
                        <span className="section-icon">📦</span>
                        <h5>Order Status</h5>
                      </div>
                      <div className="compact-content">
                        <div className="info-item">
                          <span className="info-label">Status:</span>
                          <span className={`badge status-${selectedOrder.status}`}>
                            {statusLabels[selectedOrder.status]}
                          </span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Time:</span>
                          <span className="info-value">{selectedOrder.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Food Items Section */}
                  <div className="details-section">
                    <div className="section-header">
                      <span className="section-icon">🍽️</span>
                      <h5>Food Items</h5>
                    </div>
                    <div className="section-content">
                      <div className="food-items-content">{selectedOrder.food}</div>
                    </div>
                  </div>

                  {/* Delivery Information Section */}
                  <div className="details-section">
                    <div className="section-header">
                      <span className="section-icon">📍</span>
                      <h5>Delivery Information</h5>
                    </div>
                    <div className="section-content">
                      <div className="info-row full-width">
                        <span className="info-label">Address:</span>
                        <span className="info-value">{selectedOrder.address}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Order Date:</span>
                        <span className="info-value">{selectedOrder.order_date}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Payment ID:</span>
                        <span className="info-value">{selectedOrder.payment_id}</span>
                      </div>
                      {selectedOrder.discount_id && (
                        <div className="info-row">
                          <span className="info-label">Discount ID:</span>
                          <span className="info-value discount-tag">{selectedOrder.discount_id}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Special Notes Section */}
                  {selectedOrder.notes && (
                    <div className="details-section">
                      <div className="section-header">
                        <span className="section-icon">📝</span>
                        <h5>Special Notes</h5>
                      </div>
                      <div className="section-content">
                        <div className="notes-content">{selectedOrder.notes}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Update Status Modal */}
        {orderToUpdate && (
          <div className="modal-overlay" onClick={() => setOrderToUpdate(null)}>
            <div className="modal-content update-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div className="header-info">
                  <h4>Update Order Status</h4>
                  <span className="order-id-badge">#{orderToUpdate.order_id}</span>
                </div>
                <button className="close-btn" onClick={() => setOrderToUpdate(null)}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="current-order-info">
                  <div className="order-card">
                    <div className="order-header">
                      <div className="customer-avatar">
                        <span>{orderToUpdate.name.charAt(0)}</span>
                      </div>
                      <div className="customer-details">
                        <h6>{orderToUpdate.name}</h6>
                        <p>{orderToUpdate.phone_number}</p>
                        <p className="order-total">{orderToUpdate.total_amount.toLocaleString()}đ</p>
                      </div>
                    </div>
                    <div className="current-status">
                      <span className="status-label">Current Status:</span>
                      <span className={`badge status-${orderToUpdate.status}`}>
                        {statusLabels[orderToUpdate.status]}
                      </span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleStatusUpdate} className="status-form">
                  <div className="form-group">
                    <label htmlFor="status" className="form-label">
                      <span className="label-icon">🔄</span>
                      Select New Status
                    </label>
                    <div className="status-options">
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <label key={value} className={`status-option ${newStatus === value ? "selected" : ""}`}>
                          <input
                            type="radio"
                            name="status"
                            value={value}
                            checked={newStatus === value}
                            onChange={(e) => setNewStatus(e.target.value)}
                          />
                          <span className={`status-badge status-${value}`}>{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="cancel-btn" onClick={() => setOrderToUpdate(null)}>
                      Cancel
                    </button>
                    <button type="submit" className="update-btn">
                      <span className="btn-icon">✓</span>
                      Update Status
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default ManagerOrderList
