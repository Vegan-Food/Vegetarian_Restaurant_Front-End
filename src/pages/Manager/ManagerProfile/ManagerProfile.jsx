import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './ManagerProfile.css';
import Sidebar from "../ManagerSidebar/ManagerSidebar.jsx"
import { getProfile } from "../../../api/customer_profile";

const ManagerProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Manager',
    joinDate: '',
    address: '',
    avatar: ''
  });
  const [editing, setEditing] = useState(false);
  const [editValues, setEditValues] = useState({ ...profile });

  // Password change state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordValues, setPasswordValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  useEffect(() => {
    // Chặn truy cập nếu không phải manager
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) {
      navigate("/login");
      return;
    }
    const { role } = JSON.parse(user);
    if (role !== "manager") {
      navigate("/");
      return;
    }

    // Lấy profile
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(prev => ({
          ...prev,
          name: res.name || "",
          email: res.email || "",
          phone: res.phoneNumber || "",
          address: res.address || "",
        }));
      } catch (err) {
        // Xử lý lỗi nếu cần
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleEdit = () => {
    setEditValues({ ...profile });
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setProfile(prev => ({
      ...prev,
      name: editValues.name,
      phone: editValues.phone,
      address: editValues.address
    }));
    setEditing(false);
    // TODO: Call API to update profile here
  };

  // Password handlers
  const handlePasswordInput = (e) => {
    const { name, value } = e.target;
    setPasswordValues(prev => ({
      ...prev,
      [name]: value
    }));
    setPasswordError('');
    setPasswordSuccess('');
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    if (!passwordValues.oldPassword || !passwordValues.newPassword || !passwordValues.confirmPassword) {
      setPasswordError('Please fill in all fields.');
      return;
    }
    if (passwordValues.newPassword !== passwordValues.confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    if (passwordValues.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }
    // TODO: Call API to change password here
    setPasswordSuccess('Password changed successfully!');
    setPasswordValues({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setTimeout(() => setShowPasswordForm(false), 1200);
  };

  const handlePasswordCancel = () => {
    setShowPasswordForm(false);
    setPasswordValues({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordError('');
    setPasswordSuccess('');
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <h3>Manager Personal Profile</h3>
        <p>Quickly review your personal information daily.</p>

        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <img
                src={profile.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt="Profile"
                style={{ width: 100, height: 100, borderRadius: "50%" }}
              />
            </div>
            <div>
              <h4>Personal Information</h4>
              <p>{profile.role}</p>
              <button type="button">Change Profile Picture</button>
            </div>
          </div>

          <form>
            <div className="profile-details">
              <div className="detail-section">
                <label>Full Name</label>
                {editing ? (
                  <input
                    type="text"
                    name="name"
                    value={editValues.name}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{profile.name}</p>
                )}
              </div>
              <div className="detail-section">
                <label>Email</label>
                <p>{profile.email}</p>
              </div>
              <div className="detail-section">
                <label>Phone Number</label>
                {editing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editValues.phone}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{profile.phone}</p>
                )}
              </div>
            </div>

            <div className="profile-extra">
              <div className="detail-section">
                <label>Position</label>
                <p>{profile.role}</p>
              </div>
              <div className="detail-section">
                <label>Join Date</label>
                <p>{profile.joinDate}</p>
              </div>
              <div className="detail-section">
                <label>Address</label>
                {editing ? (
                  <input
                    type="text"
                    name="address"
                    value={editValues.address}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{profile.address}</p>
                )}
              </div>
            </div>

            <div className="profile-actions">
              {editing ? (
                <>
                  <button type="button" className="update-btn" onClick={handleSave}>Save</button>
                  <button type="button" onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <button type="button" className="update-btn" onClick={handleEdit}>Update Information</button>
              )}
              <button
                type="button"
                className="change-password-btn"
                onClick={() => setShowPasswordForm(true)}
              >
                Change Password
              </button>
            </div>
          </form>

          {/* Change Password Form */}
          {showPasswordForm && (
            <div className="change-password-modal">
              <form className="change-password-form" onSubmit={handlePasswordSave}>
                <h4>Change Password</h4>
                <div className="form-group">
                  <label>Old Password</label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwordValues.oldPassword}
                    onChange={handlePasswordInput}
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordValues.newPassword}
                    onChange={handlePasswordInput}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordValues.confirmPassword}
                    onChange={handlePasswordInput}
                  />
                </div>
                {passwordError && <div className="error-message">{passwordError}</div>}
                {passwordSuccess && <div className="success-message">{passwordSuccess}</div>}
                <div className="form-actions">
                  <button type="submit" className="update-btn">Save</button>
                  <button type="button" className="btn-text" onClick={handlePasswordCancel}>Cancel</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ManagerProfile;
