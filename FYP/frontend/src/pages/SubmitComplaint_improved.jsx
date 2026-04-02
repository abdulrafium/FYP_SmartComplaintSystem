"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Zap, CheckCircle, Clock, Sparkles } from "lucide-react"
import ComplaintForm from "../components/ComplaintForm"
import SuccessPage from "../components/SuccessPage"

const SubmitComplaint = () => {
  const [submissionResult, setSubmissionResult] = useState(null)
  const handleSubmissionSuccess = (result) => setSubmissionResult(result)
  const handleStartNew = () => setSubmissionResult(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 sm:py-10 md:py-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {!submissionResult ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header with Animation */}
            <div className="text-center mb-10 sm:mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full mb-6 shadow-lg border border-blue-200"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">AI-Powered Complaint System</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight"
              >
                Submit Your Complaint
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-2 font-medium"
              >
                Our AI system intelligently routes your complaint to the right department for faster resolution.
              </motion.p>
            </div>

            {/* Features with Enhanced Animation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 sm:mb-12">
              {[
                {
                  icon: Zap,
                  title: "AI-Powered Routing",
                  desc: "Automatically assigns your complaint to the right department.",
                  color: "from-blue-500 to-blue-600",
                  iconBg: "bg-blue-100",
                  iconColor: "text-blue-600",
                  delay: 0.1,
                },
                {
                  icon: CheckCircle,
                  title: "Real-time Tracking",
                  desc: "Get instant tracking ID and monitor progress via email.",
                  color: "from-green-500 to-emerald-600",
                  iconBg: "bg-green-100",
                  iconColor: "text-green-600",
                  delay: 0.2,
                },
                {
                  icon: Clock,
                  title: "Quick Resolution",
                  desc: "Prioritized handling based on urgency and expertise.",
                  color: "from-purple-500 to-purple-600",
                  iconBg: "bg-purple-100",
                  iconColor: "text-purple-600",
                  delay: 0.3,
                },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: f.delay }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative"
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${f.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-all duration-500`}></div>
                  <div className="relative bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/50 transition-all duration-300 text-center sm:text-left">
                    <div className={`w-14 h-14 ${f.iconBg} rounded-xl flex items-center justify-center mb-4 mx-auto sm:mx-0 group-hover:scale-110 transition-transform duration-300`}>
                      <f.icon className={`w-7 h-7 ${f.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{f.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Complaint Form with Enhanced Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ComplaintForm onSuccess={handleSubmissionSuccess} />
            </motion.div>
          </motion.div>
        ) : (
          <SuccessPage result={submissionResult} onStartNew={handleStartNew} />
        )}
      </div>
    </div>
  )
}

export default SubmitComplaint
