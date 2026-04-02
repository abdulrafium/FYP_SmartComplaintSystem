"use client"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Search, Users, Shield, Home, Building2, X } from "lucide-react"
import { useState } from "react"

const Header = () => {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-200 sticky top-0 z-50 font-sukkur transition-all duration-300 hover:shadow-md relative">
      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo with Enhanced Animation */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }} 
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-110">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:animate-pulse" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-extrabold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors duration-300">
                  Sukkur IBA University
                </h1>
                <p className="text-sm sm:text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                  Smart Complaint System
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation (now hidden until lg breakpoint) */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {[
              { to: "/", label: "Home", icon: Home },
              { to: "/track", label: "Track Complaint", icon: Search },
              { to: "/admin-login", label: "Admin Login", icon: Users },
            ].map(({ to, label, icon: Icon }) => (
              <motion.div key={to} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link
                  to={to}
                  className={`flex items-center space-x-2 px-3 xl:px-4 py-2 xl:py-3 rounded-lg text-sm xl:text-base font-bold transition-all duration-300 group ${
                    isActive(to)
                      ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-sm"
                  }`}
                >
                  <Icon className={`w-5 h-5 xl:w-6 xl:h-6 transition-transform duration-300 ${
                    isActive(to) ? "" : "group-hover:scale-110 group-hover:rotate-12"
                  }`} />
                  <span>{label}</span>
                </Link>
              </motion.div>
            ))}

            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/department-login"
                className="flex items-center space-x-2 px-4 py-2 xl:px-5 xl:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg xl:rounded-xl font-bold text-sm xl:text-base hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/50 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Building2 className="w-5 h-5 xl:w-6 xl:h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10">Department Login</span>
              </Link>
            </motion.div>
          </nav>

          {/* Hamburger Toggle */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute left-0 top-full w-full bg-white border-t border-gray-200 rounded-b-lg shadow-xl z-40"
          >
            <nav className="flex flex-col p-4 space-y-3">
              {[
                { to: "/", label: "Home", icon: Home },
                { to: "/track", label: "Track Complaint", icon: Search },
                { to: "/admin-login", label: "Admin Login", icon: Users },
                { to: "/department-login", label: "Department Login", icon: Building2 },
              ].map(({ to, label, icon: Icon }) => (
                <motion.div
                  key={to}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg font-semibold transition-all duration-300 group ${
                      isActive(to)
                        ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100"
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-transform duration-300 ${
                      isActive(to) ? "" : "group-hover:scale-110 group-hover:rotate-12"
                    }`} />
                    <span>{label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Header
