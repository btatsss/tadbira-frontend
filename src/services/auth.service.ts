// ===== services/auth.service.ts =====
import api from "../api/axios";
 
export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const register = async (fullName: string, email: string, password: string) => {
  const res = await api.post("/auth/register", { fullName, email, password });
  return res.data;
};
 
export const logout = () => {
  localStorage.removeItem("token");
};
export const forgotPassword = async (email: string) => {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
};

export const resetPassword = async (token: string, password: string) => {
  const res = await api.post("/auth/reset-password", { token, password });
  return res.data;
};

 
export const getMe = async () => (await api.get("/auth/me")).data;
 