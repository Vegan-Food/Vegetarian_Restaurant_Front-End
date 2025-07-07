import { get, post, put } from "./config";

export const getOrder = () => get("/api/order/");
export const getOrderById = (orderId) => get(`/orders/${orderId}`);
export const createOrder = (orderData) => post("/orders", orderData);
export const updateOrderStatus = (orderId, status) => put(`/api/order/update-status/${orderId}`, status);