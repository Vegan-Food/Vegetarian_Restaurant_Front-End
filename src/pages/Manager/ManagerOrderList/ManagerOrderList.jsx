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
  const [updateForm, setUpdateForm] = useState({})

  const handleUpdateClick = (order) => {
    setOrderToUpdate(order)
    setUpdateForm({ ...order })
  }

  const handleDetailsClick = (order) => {
    setSelectedOrder(order)
  }

  const filteredOrders = activeFilter === "all" ? orders : orders.filter((order) => order.status === activeFilter)

  const handleUpdateChange = (e) => {
    const { name, value } = e.target
    setUpdateForm({ ...updateForm, [name]: value })
  }

  const handleUpdateSubmit = (e) => {
    e.preventDefault()
    const updatedOrders = orders.map((order) => (order.order_id === orderToUpdate.order_id ? { ...updateForm } : order))
    setOrders(updatedOrders)
    setOrderToUpdate(null)
    alert("Order updated successfully!")
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <h3>Order Management</h3>
        <p>Manage and monitor restaurant orders</p>

        <div className="order-filters">
          {["all", "pending", "preparing", "shipped", "delivered", "cancelled"].map((status) => (
            <button
              key={status}
              className={`filter-btn ${activeFilter === status ? "active" : ""}`}
              onClick={() => setActiveFilter(status)}
            >
              {status === "all" ? "All" : statusLabels[status]}
            </button>
          ))}
        </div>

        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Food</th>
              <th>Total</th>
              <th>Status</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index}>
                <td>#{order.order_id}</td>
                <td>{order.name}</td>
                <td>{order.food}</td>
                <td>{order.total_amount.toLocaleString()}đ</td>
                <td>
                  <span className={`badge status-${order.status}`}>{statusLabels[order.status] || order.status}</span>
                </td>
                <td>{order.time}</td>
                <td>
                  <div className="action-buttons">
                    <button className="detail-btn" onClick={() => handleDetailsClick(order)}>
                      Details
                    </button>
                    <button className="edit-btn" onClick={() => handleUpdateClick(order)}>
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Details Modal */}
        {selectedOrder && (
          <div
            className="modal-overlay"
            onClick={() => setSelectedOrder(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 99999,
            }}
          >
            <div
              className="modal details"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "white",
                padding: "32px",
                borderRadius: "20px",
                maxWidth: "600px",
                width: "90%",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              <h4>Order Details</h4>
              <div className="details-grid">
                <p>
                  <strong>Order ID:</strong> #{selectedOrder.order_id}
                </p>
                <p>
                  <strong>Customer ID:</strong> {selectedOrder.customer_id}
                </p>
                <p>
                  <strong>Customer Name:</strong> {selectedOrder.name}
                </p>
                <p>
                  <strong>Phone Number:</strong> {selectedOrder.phone_number}
                </p>
                <p>
                  <strong>Delivery Address:</strong> {selectedOrder.address}
                </p>
                <p>
                  <strong>Order Date:</strong> {selectedOrder.order_date}
                </p>
                <p>
                  <strong>Food Items:</strong> {selectedOrder.food}
                </p>
                <p>
                  <strong>Total Amount:</strong> {selectedOrder.total_amount.toLocaleString()}đ
                </p>
                <p>
                  <strong>Status:</strong> {statusLabels[selectedOrder.status]}
                </p>
                <p>
                  <strong>Payment Method:</strong> {selectedOrder.payment_method}
                </p>
                <p>
                  <strong>Payment ID:</strong> {selectedOrder.payment_id}
                </p>
                <p>
                  <strong>Discount ID:</strong> {selectedOrder.discount_id || "None"}
                </p>
                {selectedOrder.notes && (
                  <p className="full-width">
                    <strong>Notes:</strong> {selectedOrder.notes}
                  </p>
                )}
              </div>
              <div className="modal-actions">
                <button className="close-btn" onClick={() => setSelectedOrder(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Update Modal */}
        {orderToUpdate && (
          <div
            className="modal-overlay"
            onClick={() => setOrderToUpdate(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 99999,
            }}
          >
            <div
              className="modal update"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "white",
                padding: "40px 48px",
                borderRadius: "20px",
                maxWidth: "800px",
                width: "90%",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              <h4>Update Order #{orderToUpdate.order_id}</h4>
              <form onSubmit={handleUpdateSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Customer Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={updateForm.name || ""}
                      onChange={handleUpdateChange}
                      placeholder="Enter customer name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone_number">Phone Number *</label>
                    <input
                      id="phone_number"
                      name="phone_number"
                      type="tel"
                      value={updateForm.phone_number || ""}
                      onChange={handleUpdateChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="status">Order Status *</label>
                    <select
                      id="status"
                      name="status"
                      value={updateForm.status || ""}
                      onChange={handleUpdateChange}
                      required
                    >
                      <option value="pending">Pending</option>
                      <option value="preparing">Preparing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="payment_method">Payment Method</label>
                    <select
                      id="payment_method"
                      name="payment_method"
                      value={updateForm.payment_method || ""}
                      onChange={handleUpdateChange}
                    >
                      <option value="Cash">Cash</option>
                      <option value="VNPAY">VNPAY</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="total_amount">Total Amount (VND)</label>
                    <input
                      id="total_amount"
                      name="total_amount"
                      type="number"
                      value={updateForm.total_amount || ""}
                      onChange={handleUpdateChange}
                      placeholder="Enter total amount"
                      min="0"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="discount_id">Discount ID</label>
                    <input
                      id="discount_id"
                      name="discount_id"
                      type="number"
                      value={updateForm.discount_id || ""}
                      onChange={handleUpdateChange}
                      placeholder="Enter discount ID"
                      min="0"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="address">Delivery Address *</label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={updateForm.address || ""}
                      onChange={handleUpdateChange}
                      placeholder="Enter full delivery address"
                      required
                    />
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="food">Food Items</label>
                    <textarea
                      id="food"
                      name="food"
                      value={updateForm.food || ""}
                      onChange={handleUpdateChange}
                      placeholder="Enter food items (comma separated)"
                      rows="3"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="notes">Special Notes</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={updateForm.notes || ""}
                      onChange={handleUpdateChange}
                      placeholder="Enter any special instructions or notes..."
                      rows="3"
                    />
                  </div>
                </div>

                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={() => setOrderToUpdate(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="update-btn">
                    Update Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default ManagerOrderList
