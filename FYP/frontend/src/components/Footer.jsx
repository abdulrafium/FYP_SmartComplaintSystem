"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, ChevronDown } from "lucide-react"

const Footer = () => {
  const [open, setOpen] = useState({
    studentPortal: false,
    facultyPortal: false,
  })

  const toggle = (menu) => {
    setOpen((prev) => ({ ...prev, [menu]: !prev[menu] }))
  }

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Subtle background animation */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Info */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 hover:text-blue-400 transition-colors duration-300 cursor-default">Sukkur IBA University</h3>
            <p className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4">
              Leading institution providing quality education and innovative solutions for student services through technology.
            </p>
            <div className="flex items-center space-x-2 text-gray-300 text-sm">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Airport Road, Sukkur, Sindh, Pakistan</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 hover:text-purple-400 transition-colors duration-300 cursor-default">Contact Support</h3>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <div className="flex items-center space-x-2 text-gray-300 group hover:text-white transition-all duration-300 cursor-pointer">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 group-hover:text-blue-400 transition-transform duration-300" />
                <span>ict.se@iba-suk.edu.pk</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 group hover:text-white transition-all duration-300 cursor-pointer">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 group-hover:rotate-12 group-hover:text-green-400 transition-all duration-300" />
                <span>071-5644036, 071-5644037</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 group hover:text-white transition-all duration-300 cursor-pointer">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 group-hover:text-purple-400 transition-all duration-300" />
                <span>Mon-Fri: 9:00 AM - 5:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 hover:text-blue-400 transition-colors duration-300 cursor-default">Quick Links</h3>
            <div className="space-y-2 text-sm sm:text-base">

              <a
                href="https://www.iba-suk.edu.pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1"
              >
                University Website
              </a>

              <a
                href="https://www.iba-suk.edu.pk/student-resources"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1"
              >
                Student Resources
              </a>

              {/* Student Portal Toggle */}
              <div>
                <button
                  onClick={() => toggle("studentPortal")}
                  className="w-full flex justify-between items-center text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Student Portal
                  <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${open.studentPortal ? "rotate-180" : ""}`} />
                </button>
                <div
                  className={`ml-2 mt-2 space-y-1 overflow-hidden transition-all duration-300 ${
                    open.studentPortal ? "max-h-40" : "max-h-0"
                  }`}
                >
                  {[
                    { name: "CMS Portal", link: "https://pscs.iba-suk.edu.pk/psp/HRCS9/?cmd=login&languageCd=ENG&" },
                    { name: "Student Portal", link: "http://sibagrades.iba-suk.edu.pk:86/Default.aspx" },
                    { name: "LMS (eLearning)", link: "http://elearning.iba-suk.edu.pk/" },
                  ].map((item) => (
                    <a
                      key={item.name}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-gray-300 hover:text-white pl-4 py-1 rounded-l-md border-l-4 border-purple-600 hover:border-purple-400 bg-gray-800/50 hover:bg-gray-800/80 shadow-sm transition-all duration-300 hover:scale-105 hover:translate-x-1 hover:shadow-md"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Faculty Portal Toggle */}
              <div>
                <button
                  onClick={() => toggle("facultyPortal")}
                  className="w-full flex justify-between items-center text-gray-300 hover:text-white transition-colors font-medium mt-1"
                >
                  Faculty Portal
                  <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${open.facultyPortal ? "rotate-180" : ""}`} />
                </button>
                <div
                  className={`ml-2 mt-2 space-y-1 overflow-hidden transition-all duration-300 ${
                    open.facultyPortal ? "max-h-32" : "max-h-0"
                  }`}
                >
                  {[
                    { name: "CMS Portal", link: "https://pscs.iba-suk.edu.pk/psp/HRCS9/?cmd=login&languageCd=ENG&" },
                    { name: "LMS (eLearning)", link: "http://elearning.iba-suk.edu.pk/" },
                  ].map((item) => (
                    <a
                      key={item.name}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-gray-300 hover:text-white pl-4 py-1 rounded-l-md border-l-4 border-blue-600 hover:border-blue-400 bg-gray-800/50 hover:bg-gray-800/80 shadow-sm transition-all duration-300 hover:scale-105 hover:translate-x-1 hover:shadow-md"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 text-center text-xs sm:text-sm">
  <p className="text-gray-400">
    © 2025 Sukkur IBA University. All rights reserved. | Smart Complaint System powered by AI
  </p>
  <p className="text-gray-400 mt-2">
    Developed by FYP Group 22F-08 | BS Computer Science Batch 2022
  </p>
</div>

      </div>
    </footer>
  )
}

export default Footer
