import { get, post, put, del } from "./config";

export const getProducts = () => get("/api/products");
export const getProductById = (id) => get(`/api/products/${id}`);
export const createProduct = (data) => post("/api/products", data);
export const updateProduct = (id, data) => put(`/api/products/${id}`, data);
export const deleteProduct = (id) => del(`/api/products/${id}`);
export const feedBack = (productId) => get(`/api/feedback/product/${productId}`);