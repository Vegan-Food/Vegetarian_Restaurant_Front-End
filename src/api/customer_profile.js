import { get, post, put, del } from "./config";

export const getCustomerProfile = () => get("/api/users/customerprofile");
export const getProductById = (id) => get(`/products/${id}`);
export const createProduct = (data) => post("/products", data);
export const updateProduct = (id, data) => put(`/products/${id}`, data);
export const deleteProduct = (id) => del(`/products/${id}`);