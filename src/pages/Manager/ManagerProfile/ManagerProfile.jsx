import React, { useState, useEffect } from 'react';
import './ManagerProfile.css';
import Sidebar from "../ManagerSidebar/ManagerSidebar.jsx"

const ManagerProfile = () => {
  const [profile] = useState({});

  useEffect(() => {
    // Fetch data from backend API (to be implemented)
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <h3>Manager Personal Profile</h3>
        <p>Quickly review your personal information daily.</p>

        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar"></div>
            <div>
              <h4>Personal Information</h4>
              <p>Administrator</p>
              <button>Change Profile Picture</button>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-section">
              <label>Full Name</label>
              <p>{profile.name || 'Vo Chi Quan'}</p>
            </div>
            <div className="detail-section">
              <label>Email</label>
              <p>{profile.email || 'admin@restaurant.com'}</p>
            </div>
            <div className="detail-section">
              <label>Phone Number</label>
              <p>{profile.phone || '0123456789'}</p>
            </div>
          </div>

          <div className="profile-extra">
            <div className="detail-section">
              <label>Position</label>
              <p>{profile.role || 'Administrator'}</p>
            </div>
            <div className="detail-section">
              <label>Join Date</label>
              <p>{profile.joinDate || '01/01/2023'}</p>
            </div>
            <div className="detail-section">
              <label>Address</label>
              <p>{profile.address || 'FPT UNI'}</p>
            </div>
          </div>

          <div className="profile-actions">
            <button className="update-btn">Update Information</button>
            <button className="change-password-btn">Change Password</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManagerProfile;
