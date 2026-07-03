// ===== services/project.service.ts =====
import api from "../api/axios";
 
export const getProjects = async () => (await api.get("/projects")).data;
export const getProject = async (id: string) => (await api.get(`/projects/${id}`)).data;
export const createProject = async (data: any) => (await api.post("/projects", data)).data;
export const updateProject = async (id: string, data: any) => (await api.put(`/projects/${id}`, data)).data;
export const deleteProject = async (id: string) => (await api.delete(`/projects/${id}`)).data;
