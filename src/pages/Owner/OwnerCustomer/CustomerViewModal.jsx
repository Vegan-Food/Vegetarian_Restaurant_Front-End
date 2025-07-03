// src/Owner/OwnerCustomer/CustomerViewModal.jsx
import "./CustomerViewModal.css"

const CustomerViewModal = ({ customer, onClose }) => {
  if (!customer) return null

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h2>Customer Details</h2>
        <p><strong>Name:</strong> {customer.name}</p>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Phone:</strong> {customer.phone}</p>
        <p><strong>Address:</strong> {customer.address}</p>
        <p><strong>Total Orders:</strong> {customer.orders}</p>
        <p><strong>Total Spent:</strong> ${customer.totalSpent.toFixed(2)}</p>
        <p><strong>Last Order:</strong> {customer.lastOrder}</p>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default CustomerViewModal
