"use client"

import { useState } from "react"
import "./OrderDetailModal.css"

const EditStatusModal = ({ order, onClose, onSave }) => {
  const [newStatus, setNewStatus] = useState(order.status)

  const handleSave = () => {
    const updatedOrder = { ...order, status: newStatus }
    onSave(updatedOrder)
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

export default EditStatusModal
