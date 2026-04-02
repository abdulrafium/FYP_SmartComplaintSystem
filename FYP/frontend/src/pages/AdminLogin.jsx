"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate, Link } from "react-router-dom"
import { Users, Shield, Eye, EyeOff, Lock, Mail, CheckCircle, AlertCircle } from "lucide-react"

const AdminLogin = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showWelcome, setShowWelcome] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [rightPanelText, setRightPanelText] = useState("")

  // Continuous typing animation for right panel
  const welcomeText = "WELCOME BACK!"
  
  useEffect(() => {
    let index = 0
    let isDeleting = false
    
    const typingInterval = setInterval(() => {
      if (!isDeleting && index <= welcomeText.length) {
        setRightPanelText(welcomeText.slice(0, index))
        index++
        if (index > welcomeText.length) {
          setTimeout(() => {
            isDeleting = true
          }, 2000)
        }
      } else if (isDeleting && index > 0) {
        index--
        setRightPanelText(welcomeText.slice(0, index))
        if (index === 0) {
          setTimeout(() => {
            isDeleting = false
            index = 0
          }, 500)
        }
      }
    }, isDeleting ? 50 : 150)
    
    return () => clearInterval(typingInterval)
  }, [])

  // Popup typing animation effect
  const fullText = "Welcome Back, Admin!"
  
  useEffect(() => {
    if (showWelcome) {
      let index = 0
      let isDeleting = false
      
      const typingInterval = setInterval(() => {
        if (!isDeleting && index <= fullText.length) {
          setTypedText(fullText.slice(0, index))
          index++
          if (index > fullText.length) {
            // Pause before starting to delete
            setTimeout(() => {
              isDeleting = true
            }, 2000)
          }
        } else if (isDeleting && index > 0) {
          index--
          setTypedText(fullText.slice(0, index))
          if (index === 0) {
            // Pause before starting to type again
            setTimeout(() => {
              isDeleting = false
              index = 0
            }, 500)
          }
        }
      }, isDeleting ? 50 : 100) // Faster when deleting
      
      return () => clearInterval(typingInterval)
    }
  }, [showWelcome])

  // Dummy credentials
  const ADMIN_CREDENTIALS = {
    email: "sscs.admin@iba-suk.edu.pk",
    password: "12345"
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Validate credentials
    if (formData.email === ADMIN_CREDENTIALS.email && formData.password === ADMIN_CREDENTIALS.password) {
      // Store auth in localStorage
      localStorage.setItem("adminAuth", JSON.stringify({
        isAuthenticated: true,
        email: formData.email,
        role: "admin",
        timestamp: new Date().getTime()
      }))
      
      setLoading(false)
      setShowWelcome(true)
      
      // Navigate to admin dashboard after showing welcome
      setTimeout(() => {
        navigate("/admin")
      }, 2500)
    } else {
      setLoading(false)
      setError("Invalid email or password. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-6 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* AI Network Nodes */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(8)].map((_, i) => (
            <div
              key={`node-${i}`}
              className="absolute w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-500/50 animate-pulse-node"
              style={{
                left: `${10 + (i % 4) * 30}%`,
                top: `${15 + Math.floor(i / 4) * 40}%`,
                animationDelay: `${i * 0.4}s`,
              }}
            >
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
            </div>
          ))}
        </div>

        {/* Security Shield Icons Floating */}
        <div className="absolute inset-0 opacity-15">
          {[
            { icon: '🔒', pos: { left: '15%', top: '20%' }, delay: 0 },
            { icon: '🛡️', pos: { left: '85%', top: '25%' }, delay: 1 },
            { icon: '👤', pos: { left: '10%', top: '70%' }, delay: 2 },
            { icon: '⚡', pos: { left: '80%', top: '65%' }, delay: 3 },
          ].map((item, i) => (
            <div
              key={`icon-${i}`}
              className="absolute text-3xl text-white animate-float-icons"
              style={{
                ...item.pos,
                animationDelay: `${item.delay}s`,
              }}
            >
              {item.icon}
            </div>
          ))}
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

        {/* Scanning Lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent animate-scan-line"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent animate-scan-line" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      <div className="relative w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* Left Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 bg-black/70 backdrop-blur-md p-8 md:p-10 flex flex-col justify-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center mb-6 md:mb-8"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 md:mb-6 shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 md:mb-2 text-center">Admin Login</h2>
            <p className="text-gray-300 text-center text-sm sm:text-base">
              Secure access to the <span className="font-semibold">Admin Dashboard</span>
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label className="block text-sm font-semibold text-gray-200 mb-1 sm:mb-2">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-2 sm:py-3 rounded-lg bg-gray-800/70 text-white placeholder-gray-400 border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500/40 outline-none"
                  placeholder="admin@iba-suk.edu.pk"
                  required
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <label className="block text-sm font-semibold text-gray-200 mb-1 sm:mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-2 sm:py-3 rounded-lg bg-gray-800/70 text-white placeholder-gray-400 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/40 outline-none"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center space-x-2 bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.03 }}
              whileTap={{ scale: loading ? 1 : 0.97 }}
              transition={{ type: "spring", stiffness: 300 }}
              type="submit"
              disabled={loading}
              className="w-full py-2 sm:py-3 flex items-center justify-center gap-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Access Admin Dashboard
                </>
              )}
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-6 sm:mt-8 text-center"
          >
            <Link to="/" className="text-purple-400 hover:text-purple-300 font-medium">
              ← Back to Home
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Section with Diagonal Cut (hidden on mobile) */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="hidden md:block relative w-1/2 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-700 clip-diagonal flex items-center justify-center text-white p-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="text-center"
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 200 }}
                className="text-3xl md:text-4xl font-extrabold mb-6 text-white drop-shadow-2xl whitespace-nowrap min-h-[50px]"
              >
                <span className="inline-block">
                  {rightPanelText}
                  <span className="animate-pulse ml-1">|</span>
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="text-lg md:text-xl max-w-sm mx-auto text-white/95 font-medium leading-relaxed drop-shadow-lg"
              >
                We are glad to see you again. Your admin panel is just one step away.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Welcome Popup */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 shadow-2xl max-w-md w-full text-center relative overflow-hidden"
            >
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 360] }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative z-10"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl font-extrabold text-white mb-3 relative z-10 min-h-[40px]"
              >
                <span className="inline-block">
                  {typedText}
                  <span className="animate-pulse ml-1">|</span>
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white/90 text-lg mb-2 relative z-10"
              >
                Login Successful
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-white/70 text-sm relative z-10"
              >
                Redirecting to dashboard...
              </motion.p>

              {/* Progress bar */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 1.5 }}
                className="h-1 bg-white/30 rounded-full mt-6 overflow-hidden relative z-10"
              >
                <div className="h-full bg-white rounded-full"></div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>
        {`
          .clip-diagonal {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 15% 100%);
          }
        `}
      </style>
    </div>
  )
}

export default AdminLogin
