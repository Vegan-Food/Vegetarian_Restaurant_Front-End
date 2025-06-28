import { get, post } from "./config";

export const getOrders = (userId) => get(`/orders?userId=${userId}`);
export const getOrderById = (orderId) => get(`/orders/${orderId}`);
export const createOrder = (orderData) => post("/orders", orderData);