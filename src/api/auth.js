import { post } from "./config";

export const login = (email, password) =>
  post("/auth/login", { email, password });
