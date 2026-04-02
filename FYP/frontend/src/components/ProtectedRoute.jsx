import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children, requiredRole, redirectTo }) => {
  // Check authentication based on required role
  const checkAuth = () => {
    if (requiredRole === "admin") {
      const adminAuth = localStorage.getItem("adminAuth")
      if (!adminAuth) return false
      
      try {
        const auth = JSON.parse(adminAuth)
        // Check if authenticated and not expired (24 hours)
        const currentTime = new Date().getTime()
        const expirationTime = 24 * 60 * 60 * 1000 // 24 hours
        
        if (auth.isAuthenticated && auth.role === "admin" && (currentTime - auth.timestamp) < expirationTime) {
          return true
        }
      } catch (e) {
        console.error("Invalid auth data", e)
        return false
      }
    }
    
    if (requiredRole === "department") {
      const departmentAuth = localStorage.getItem("departmentAuth")
      if (!departmentAuth) return false
      
      try {
        const auth = JSON.parse(departmentAuth)
        // Check if authenticated and not expired (24 hours)
        const currentTime = new Date().getTime()
        const expirationTime = 24 * 60 * 60 * 1000 // 24 hours
        
        if (auth.isAuthenticated && auth.role === "department" && (currentTime - auth.timestamp) < expirationTime) {
          return true
        }
      } catch (e) {
        console.error("Invalid auth data", e)
        return false
      }
    }
    
    return false
  }

  // If not authenticated, redirect to login page
  if (!checkAuth()) {
    return <Navigate to={redirectTo} replace />
  }

  // If authenticated, render the protected content
  return children
}

export default ProtectedRoute
