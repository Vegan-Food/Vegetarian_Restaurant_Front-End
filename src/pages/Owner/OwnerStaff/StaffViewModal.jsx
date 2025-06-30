import React from "react"
import "./StaffModal.css"

const StaffViewModal = ({ staff, onClose }) => {
  if (!staff) return null

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h2>Staff Details</h2>
        <p><strong>Name:</strong> {staff.name}</p>
        <p><strong>Position:</strong> {staff.position}</p>
        <p><strong>Email:</strong> {staff.email}</p>
        <p><strong>Phone:</strong> {staff.phone}</p>
        <p><strong>Status:</strong> {staff.status}</p>
        <p><strong>Join Date:</strong> {staff.joinDate}</p>
        <p><strong>Department:</strong> {staff.department}</p>
        <button onClick={onClose} className="btn-close">Close</button>
      </div>
    </div>
  )
}

export default StaffViewModal
