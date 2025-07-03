import { post } from "./config";

export const loginByGoogle = (email, name) =>
  post("/api/auth/google", { email, name });
