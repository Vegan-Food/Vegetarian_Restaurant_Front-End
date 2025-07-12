// src/api/ticketApi.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Tự động thêm Authorization header nếu có token
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const ticketApi = {
  // Tạo ticket mới
  createTicket: (data) =>
    axios.post(`${API_BASE_URL}/tickets`, data, {
      headers: getAuthHeader()
    }),

  // Lấy ticket của chính người dùng
  getMyTickets: () =>
    axios.get(`${API_BASE_URL}/tickets/me`, {
      headers: getAuthHeader()
    })
};

export default ticketApi;
