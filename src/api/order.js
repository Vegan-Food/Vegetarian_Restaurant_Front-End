import { get, post, put } from "./config";

export const getOrder = () => get("/api/order/");
export const updateOrderStatus = (orderId, status) => put(`/api/order/update-status/${orderId}`, status);
export const checkoutOrder = (orderData) => post("/api/order/checkout", orderData);
export const getPayOS = (orderId) => get(`/api/payment/create/${orderId}`);
