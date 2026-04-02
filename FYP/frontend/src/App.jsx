"use client"
import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Header from "./components/Header"
import Footer from "./components/Footer"
import SubmitComplaint from "./pages/SubmitComplaint"
import TrackComplaint from "./pages/TrackComplaint"
import AdminDashboard from "./pages/AdminDashboard"
import DepartmentDashboard from "./pages/DepartmentDashboard"
import AdminLogin from "./pages/AdminLogin"
import DepartmentLogin from "./pages/DepartmentLogin"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  console.log("[v0] App component is rendering")

  return (
    <div className="min-h-screen">
      {console.log("[v0] About to render Routes")}
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/submit-complaint"
          element={
            <div className="min-h-screen flex flex-col bg-gray-50">
              <Header />
              <main className="flex-1">
                <SubmitComplaint />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/track"
          element={
            <div className="min-h-screen flex flex-col bg-gray-50">
              
              <main className="flex-1">
                <TrackComplaint />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/track/:trackingId"
          element={
            <div className="min-h-screen flex flex-col bg-gray-50">
              <Header />
              <main className="flex-1">
                <TrackComplaint />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="min-h-screen flex flex-col bg-gray-50">
              <Header />
              <main className="flex-1">
                <Login />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
  path="/admin-login"
  element={
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <AdminLogin />
      </main>
      <Footer />
    </div>
  }
/>

<Route
  path="/department-login"
  element={
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <DepartmentLogin />
      </main>
      <Footer />
    </div>
  }
/>

        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin" redirectTo="/admin-login">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="department" redirectTo="/department-login">
              <DepartmentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <div className="min-h-screen flex flex-col bg-gray-50">
              <Header />
              <main className="flex-1">
                <NotFound />
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </div>
  )
}

export default App
