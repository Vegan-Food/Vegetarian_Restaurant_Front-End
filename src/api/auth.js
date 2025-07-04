import { post } from "./config";

export const loginByGoogle = (email, name) =>
  post("/api/auth/google", { email, name });

export const loginWithAdmin = (email, password) =>
  post("/api/auth/login", { email, password });
