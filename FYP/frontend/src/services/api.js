import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
})

export { api }
export default api

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// API functions
export const verifyEmail = async (email) => {
  const response = await api.post("/verify-email", { email })
  return response.data
}

export const submitComplaint = async (formData) => {
  const response = await api.post("/complaints", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data
}

export const trackComplaint = async (trackingId) => {
  const response = await api.get(`/complaints/track/${trackingId}`)
  return response.data
}

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials)
  return response.data
}

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me")
  return response.data
}

export const getMyComplaints = async (params = {}) => {
  const response = await api.get("/complaints/my-complaints", { params })
  return response.data
}

export const updateComplaintStatus = async (id, data) => {
  const response = await api.patch(`/complaints/${id}/status`, data)
  return response.data
}

export const getAdminStats = async () => {
  const response = await api.get("/admin/stats")
  return response.data
}

export const getAdminComplaints = async (params = {}) => {
  const response = await api.get("/admin/complaints", { params })
  return response.data
}

export const assignComplaint = async (id, data) => {
  const response = await api.patch(`/admin/complaints/${id}/assign`, data)
  return response.data
}

export const getDepartments = async () => {
  const response = await api.get("/departments")
  return response.data
}

export const getDepartmentRoles = async (departmentId) => {
  const response = await api.get(`/departments/${departmentId}/roles`)
  return response.data
}

export const getUsers = async (params = {}) => {
  const response = await api.get("/admin/users", { params })
  return response.data
}
