import { get, post, put, del } from "./config";

export const getProducts = () => get("api/products");
export const getProductById = (id) => get(`/products/${id}`);
export const createProduct = (data) => post("/products", data);
export const updateProduct = (id, data) => put(`/products/${id}`, data);
export const deleteProduct = (id) => del(`/products/${id}`);