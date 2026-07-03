// ===== services/task.service.ts =====
import api from "../api/axios";
 
export const getTasks = async () => (await api.get("/tasks")).data;
export const getTask = async (id: string) => (await api.get(`/tasks/${id}`)).data;
export const createTask = async (data: any) => (await api.post("/tasks", data)).data;
export const updateTask = async (id: string, data: any) => (await api.put(`/tasks/${id}`, data)).data;
export const deleteTask = async (id: string) => (await api.delete(`/tasks/${id}`)).data;