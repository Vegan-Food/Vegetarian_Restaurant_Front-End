import { post } from "./config";

export const login = (email, name) =>
  post("/api/auth/google", { email, name });
