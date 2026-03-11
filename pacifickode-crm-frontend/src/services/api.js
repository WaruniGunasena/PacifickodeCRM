import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7196/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

export const departmentService = {
  getAll: () => api.get("/department").then((res) => res.data),
  getById: (id) => api.get(`/department/${id}`).then((res) => res.data),
  
  create: (data) => api.post("/department", data).then((res) => res.data),
  update: (id, data) =>
    api.patch(`/department/${id}`, data).then((res) => res.data),
  delete: (id) => api.delete(`/department/${id}`).then((res) => res.data),
};

export const employeeService = {
  getAll: () => api.get("/employee").then((res) => res.data),
  getById: (id) => api.get(`/employee/${id}`).then((res) => res.data),
  create: (data) => api.post("/employee", data).then((res) => res.data),
  update: (id, data) =>
    api.patch(`/employee/${id}`, data).then((res) => res.data),
  delete: (id) => api.delete(`/employee/${id}`).then((res) => res.data),
};
