
import api from "../api/axios";
 
export const getClients = async () => (await api.get("/clients")).data;
export const getClient = async (id: string) => (await api.get(`/clients/${id}`)).data;
export const createClient = async (data: any) => (await api.post("/clients", data)).data;
export const updateClient = async (id: string, data: any) => (await api.put(`/clients/${id}`, data)).data;
export const deleteClient = async (id: string) => (await api.delete(`/clients/${id}`)).data;
 