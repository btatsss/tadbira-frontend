import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/home/home";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Projects from "../pages/projects/projects";
import Tasks from "../pages/tasks/tasks";
import Clients from "../pages/clients/Clients";
//import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/clients" element={<Clients />} />
      </Routes>
    </BrowserRouter>
  );
}