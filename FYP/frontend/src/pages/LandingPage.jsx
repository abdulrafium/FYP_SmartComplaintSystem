"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { CheckCircle, FileText, Shield, Search, Star, Award, Clock, TrendingUp } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-[Inter]">
      <Header />

      {/* Hero Section with AI-Themed Animated Background */}
      <section className="relative overflow-hidden py-6 sm:py-10 min-h-[600px] sm:min-h-[700px] flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
          
          {/* AI Brain Network Animation */}
          <div className="absolute inset-0 opacity-30">
            {/* Neural Network Nodes */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`node-${i}`}
                className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-500/50 animate-pulse-node"
                style={{
                  left: `${15 + (i % 4) * 25}%`,
                  top: `${20 + Math.floor(i / 4) * 25}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
              </div>
            ))}
          </div>

          {/* Document Flow Animation */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(6)].map((_, i) => (
              <div
                key={`doc-${i}`}
                className="absolute animate-float-document"
                style={{
                  left: `${10 + i * 15}%`,
                  animationDelay: `${i * 1.5}s`,
                  animationDuration: '8s',
                }}
              >
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
            ))}
          </div>

          {/* AI Processing Waves */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-scan-line"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-scan-line" style={{ animationDelay: '2s' }}></div>
          </div>

          {/* Complaint Status Icons Floating */}
          <div className="absolute inset-0 opacity-25">
            {[
              { icon: '✓', color: 'text-green-400', pos: { left: '10%', top: '15%' } },
              { icon: '⏳', color: 'text-yellow-400', pos: { left: '85%', top: '20%' } },
              { icon: '🎯', color: 'text-blue-400', pos: { left: '15%', top: '75%' } },
              { icon: '⚡', color: 'text-purple-400', pos: { left: '80%', top: '70%' } },
            ].map((item, i) => (
              <div
                key={`icon-${i}`}
                className={`absolute text-4xl ${item.color} animate-float-icons`}
                style={{
                  ...item.pos,
                  animationDelay: `${i * 0.8}s`,
                }}
              >
                {item.icon}
              </div>
            ))}
          </div>

          {/* Glowing Orbs for Ambiance */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

          {/* Overlay for text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-8 sm:-mt-12 md:-mt-16">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            {/* Badge with enhanced visibility - Always visible on all devices */}
            <div className="inline-flex items-center space-x-2 bg-white/95 backdrop-blur-md text-blue-700 px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-5 md:mb-6 shadow-2xl border-2 border-blue-200 animate-float">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 animate-pulse" />
              <span className="whitespace-nowrap">AI-Enabled Resolution System</span>
            </div>

            {/* Main Heading with Enhanced Visibility and Animation */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-3 sm:mb-4 md:mb-5 leading-tight tracking-tight px-2">
              <span className="block text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] animate-fade-in-up">
                AI-Enabled Complaint
              </span>
              <span className="block mt-2 sm:mt-3">
                <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">Management for </span>
                <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(147,51,234,0.9)] animate-gradient-x font-black">
                  Faster Resolutions
                </span>
              </span>
            </h1>

            {/* Description with better contrast */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mb-6 sm:mb-8 md:mb-10 max-w-xl sm:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed font-semibold backdrop-blur-sm bg-black/30 py-3 px-4 sm:py-4 sm:px-6 rounded-2xl border border-white/10">
              Submit your complaints and track their progress with our intelligent system that automatically categorizes
              and routes issues to the right departments.
            </p>

            {/* CTA Buttons with Enhanced Styles */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 justify-center px-4">
              <Link 
                to="/submit-complaint" 
                className="group px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl font-bold text-base sm:text-lg md:text-xl hover:scale-105 sm:hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 border-2 border-white/20 backdrop-blur-sm animate-pulse-glow"
              >
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 inline mr-2 sm:mr-3 group-hover:rotate-12 transition-transform" />
                Submit Complaint
              </Link>
              <Link 
                to="/track" 
                className="group px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 bg-white/95 backdrop-blur-md text-blue-600 border-2 border-white rounded-2xl font-bold text-base sm:text-lg md:text-xl hover:bg-white hover:scale-105 sm:hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-white/50"
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 inline mr-2 sm:mr-3 group-hover:rotate-12 transition-transform" />
                Track Complaint
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements - Reduced shadow */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
      </section>


      {/* How It Works Section - Modern Animated Glass Cards */}
      <section className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4 tracking-tight drop-shadow-sm">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-gray-700 font-semibold max-w-2xl mx-auto leading-relaxed">
              Simple, fast, and efficient complaint resolution process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {/* Step 1 - Submit */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
              <div className="relative bg-white/70 backdrop-blur-xl border-2 border-white/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/50">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-blue-500/50">
                    <FileText className="w-12 h-12 text-white" />
                  </div>
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 group-hover:w-20 transition-all duration-500"></div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    1. Submit
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base font-medium">
                    Fill out our simple form with your complaint details. Upload attachments if needed to provide more context.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 - AI Categorization */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
              <div className="relative bg-white/70 backdrop-blur-xl border-2 border-white/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-purple-400/50">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-purple-500/50">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 group-hover:w-20 transition-all duration-500"></div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                    2. AI Categorization
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base font-medium">
                    Our AI instantly analyzes and categorizes your complaint, determining urgency and routing to the right department.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 - Resolution */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
              <div className="relative bg-white/70 backdrop-blur-xl border-2 border-white/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-green-400/50">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-green-500/50">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mb-4 group-hover:w-20 transition-all duration-500"></div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
                    3. Resolution
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base font-medium">
                    Track progress in real-time as the assigned department works on your complaint until it's fully resolved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section - Modern Animated Cards */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-400/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
              Proven Results
            </h2>
            <p className="text-white/90 text-lg md:text-xl font-semibold drop-shadow-md">
              Real metrics from our complaint management system
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Card 1 - Complaints Resolved */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 transition-all duration-500 hover:bg-white/15 hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-500/30">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <Award className="w-16 h-16 text-yellow-300 drop-shadow-lg group-hover:drop-shadow-[0_0_15px_rgba(253,224,71,0.8)]" />
                  </div>
                  <div className="text-5xl font-extrabold text-white mb-3 tracking-tight group-hover:scale-110 transition-transform duration-300">
                    1,247
                  </div>
                  <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full mb-3 group-hover:w-24 transition-all duration-500"></div>
                  <div className="text-white/90 text-base font-bold tracking-wide">
                    Complaints Resolved
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Avg Resolution Time */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 transition-all duration-500 hover:bg-white/15 hover:border-green-400/50 hover:shadow-2xl hover:shadow-green-500/30">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
                    <Clock className="w-16 h-16 text-green-300 drop-shadow-lg group-hover:drop-shadow-[0_0_15px_rgba(134,239,172,0.8)]" />
                  </div>
                  <div className="text-5xl font-extrabold text-white mb-3 tracking-tight group-hover:scale-110 transition-transform duration-300">
                    24hrs
                  </div>
                  <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-emerald-300 rounded-full mb-3 group-hover:w-24 transition-all duration-500"></div>
                  <div className="text-white/90 text-base font-bold tracking-wide">
                    Avg Resolution Time
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - Satisfaction Rate */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-400 to-rose-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 transition-all duration-500 hover:bg-white/15 hover:border-pink-400/50 hover:shadow-2xl hover:shadow-pink-500/30">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <TrendingUp className="w-16 h-16 text-pink-300 drop-shadow-lg group-hover:drop-shadow-[0_0_15px_rgba(249,168,212,0.8)]" />
                  </div>
                  <div className="text-5xl font-extrabold text-white mb-3 tracking-tight group-hover:scale-110 transition-transform duration-300">
                    98%
                  </div>
                  <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-rose-300 rounded-full mb-3 group-hover:w-24 transition-all duration-500"></div>
                  <div className="text-white/90 text-base font-bold tracking-wide">
                    Satisfaction Rate
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 - User Rating */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-violet-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 transition-all duration-500 hover:bg-white/15 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/30">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
                    <Star className="w-16 h-16 text-purple-300 drop-shadow-lg group-hover:drop-shadow-[0_0_15px_rgba(216,180,254,0.8)] fill-purple-300" />
                  </div>
                  <div className="text-5xl font-extrabold text-white mb-3 tracking-tight group-hover:scale-110 transition-transform duration-300">
                    4.9
                  </div>
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-violet-300 rounded-full mb-3 group-hover:w-24 transition-all duration-500"></div>
                  <div className="text-white/90 text-base font-bold tracking-wide">
                    User Rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LandingPage
