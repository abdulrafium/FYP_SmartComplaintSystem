"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import {
  Upload,
  X,
  AlertCircle,
  CheckCircle,
  Loader,
  User,
  Mail,
  GraduationCap,
  Calendar,
  FileText,
  Paperclip,
} from "lucide-react"
import toast from "react-hot-toast"
import { submitComplaint } from "../services/api"
import axios from "axios"

const ComplaintForm = ({ onSuccess }) => {
  const [files, setFiles] = useState([])
  const [emailVerified, setEmailVerified] = useState(false)
  const [emailVerifying, setEmailVerifying] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [emailError, setEmailError] = useState("")

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
    setValue,
  } = useForm()

  const watchedEmail = watch("email")
  const role = watch("role")

  const handleEmailVerification = async (email) => {
    if (!email) {
      setEmailVerified(false)
      return
    }

    if (!email.endsWith("@iba-suk.edu.pk")) {
      setEmailVerified(false)
      toast.error("Please use your Sukkur IBA University email (@iba-suk.edu.pk)", {
        position: "top-left",
      })
      return
    }

    setEmailVerifying(true)
    try {
      const res = await axios.post("http://localhost:3000/api/verify-email", { email })

      if (res.data.isValid) {
        setEmailVerified(true)
        toast.success("University email verified", { position: "top-right" })
      } else {
        setEmailVerified(false)
        toast.error(res.data.error || "Invalid Sukkur IBA University email", {
          position: "top-right",
        })
      }
    } catch (error) {
      setEmailVerified(false)
      toast.error(error.response?.data?.error || "Email verification failed", {
        position: "top-right",
      })
    } finally {
      setEmailVerifying(false)
    }
  }

  const handleEmailChange = (e) => {
    const email = e.target.value
    setValue("email", email)
    setEmailVerified(false)

    if (email) {
      clearTimeout(window.emailValidationTimeout)
      window.emailValidationTimeout = setTimeout(() => {
        handleEmailVerification(email)
      }, 500)
    }
  }

  const handleFileSelect = (selectedFiles) => {
    const validFiles = Array.from(selectedFiles).filter((file) => {
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ]
      const maxSize = 10 * 1024 * 1024
      if (!validTypes.includes(file.type)) {
        toast.error(`${file.name}: Invalid file type`)
        return false
      }
      if (file.size > maxSize) {
        toast.error(`${file.name}: File too large (max 10MB)`)
        return false
      }
      return true
    })

    if (files.length + validFiles.length > 5) {
      toast.error("Maximum 5 files allowed")
      return
    }

    setFiles((prev) => [...prev, ...validFiles])
  }

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const onSubmit = async (data) => {
    if (!emailVerified) {
      toast.error("Please verify your email address first")
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
      files.forEach((file) => {
        formData.append("attachments", file)
      })

      const result = await submitComplaint(formData)
      toast.success("Complaint submitted successfully!")
      onSuccess(result)
    } catch (error) {
      console.error("Submission error:", error)
      toast.error(error.response?.data?.error || "Failed to submit complaint")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-6 sm:p-10 max-w-4xl mx-auto"
    >
      <div className="text-center mb-8 sm:mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6"
        >
          <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </motion.div>
        <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-2 sm:mb-4">
          Submit Your Complaint
        </h2>
        <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Fill out the form below with detailed information about your complaint. Our AI system will automatically
          categorize and route it to the appropriate department.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-10">
        {/* Role Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-8 border border-blue-100"
        >
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900">Select Role</h3>
          </div>

          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">
              Role *
            </label>
            <select
              {...register("role", { required: "Role is required" })}
              className={`w-full px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl text-sm sm:text-lg transition-all duration-300 ${errors.role
                  ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                }`}
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="staff">Staff / Faculty</option>
            </select>
            {errors.role && (
              <p className="text-red-600 text-xs sm:text-sm mt-1 sm:mt-2 flex items-center">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {errors.role.message}
              </p>
            )}
          </div>
        </motion.div>

        {/* Personal Information Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-8 border border-blue-100"
        >
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900">Personal Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1 sm:mb-2">
                Full Name *
              </label>
              <input
                type="text"
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: { value: 3, message: "Name must be at least 3 characters" },
                  pattern: {
                    value: /^[a-zA-Z\s]{2,}$/,
                    message: "Please enter a valid name (letters only, at least 2 words)",
                  },
                })}
                className={`w-full px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl text-sm sm:text-lg ${errors.fullName
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                  }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-600 text-xs sm:text-sm mt-1 sm:mt-2 flex items-center">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Student Fields */}
            {role === "student" && (
              <>
                {/* CMS ID */}
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1 sm:mb-2">
                    CMS ID *
                  </label>
                  <input
                    type="text"
                    {...register("cmsId", {
                      required: "CMS ID is required",
                      pattern: {
                        value: /^\d{3}-\d{2}-\d{4}$/,
                        message: "CMS ID must be in format 000-00-0000",
                      },
                    })}
                    className={`w-full px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl text-sm sm:text-lg ${errors.cmsId
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-500"
                      }`}
                    placeholder="e.g., 023-22-0252"
                  />
                  {errors.cmsId && (
                    <p className="text-red-600 text-xs sm:text-sm mt-1 sm:mt-2 flex items-center">
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {errors.cmsId.message}
                    </p>
                  )}
                </div>

                {/* Semester */}
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1 sm:mb-2">
                    Semester *
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                    <select
                      {...register("semester", { required: "Semester is required" })}
                      className={`w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 border-2 rounded-xl text-sm sm:text-lg ${errors.semester
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                        }`}
                    >
                      <option value="">Select Semester</option>
                      {[...Array(8).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1} Semester
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.semester && (
                    <p className="text-red-600 text-xs sm:text-sm mt-1 sm:mt-2 flex items-center">
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {errors.semester.message}
                    </p>
                  )}
                </div>

                {/* Year */}
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1 sm:mb-2">
                    Year *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                    <select
                      {...register("year", { required: "Year is required" })}
                      className={`w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 border-2 rounded-xl text-sm sm:text-lg ${errors.year
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                        }`}
                    >
                      <option value="">Select Year</option>
                      {[2020, 2021, 2022, 2023, 2024, 2025].map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.year && (
                    <p className="text-red-600 text-xs sm:text-sm mt-1 sm:mt-2 flex items-center">
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {errors.year.message}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Staff/Faculty Fields */}
            {role === "staff" && (
              <>
                {/* Department */}
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1 sm:mb-2">
                    Department *
                  </label>
                  <select
                    {...register("department", { required: "Department is required" })}
                    className={`w-full px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl text-sm sm:text-lg ${errors.department
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-500"
                      }`}
                  >
                    <option value="">Select Department</option>
                    <option value="CS">Computer Science</option>
                    <option value="EE">Electrical Engineering</option>
                    <option value="BBA">Business Administration</option>
                    <option value="Education">Education</option>
                    <option value="Math">Mathematics</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.department && (
                    <p className="text-red-600 text-xs sm:text-sm mt-1 sm:mt-2 flex items-center">
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {errors.department.message}
                    </p>
                  )}
                </div>

                {/* Relevant Info */}
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1 sm:mb-2">
                    Relevant Info *
                  </label>
                  <select
                    {...register("relevantInfo", { required: "Relevant info is required" })}
                    className={`w-full px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl text-sm sm:text-lg ${errors.relevantInfo
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-500"
                      }`}
                  >
                    <option value="">Select Info</option>
                    <option value="teaching">Teaching</option>
                    <option value="research">Research</option>
                    <option value="administration">Administration</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.relevantInfo && (
                    <p className="text-red-600 text-xs sm:text-sm mt-1 sm:mt-2 flex items-center">
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {errors.relevantInfo.message}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Email */}
          <div className="mt-4 sm:mt-6">
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1 sm:mb-2">
              University Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
              <input
                type="email"
                className={`w-full pl-10 sm:pl-12 pr-12 sm:pr-16 py-3 sm:py-4 border-2 rounded-xl text-sm sm:text-lg ${emailVerified
                    ? "border-green-300 focus:border-green-500"
                    : "border-gray-200 focus:border-blue-500"
                  }`}
                placeholder="your.name@iba-suk.edu.pk"
                value={watchedEmail}
                onChange={handleEmailChange}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4">
                {emailVerifying && <Loader className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 animate-spin" />}
                {!emailVerifying && emailVerified && <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />}
                {!emailVerifying && watchedEmail && !emailVerified && watchedEmail.includes("@") && (
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                )}
              </div>
            </div>
            {!emailVerified && watchedEmail && watchedEmail.includes("@") && (
              <p className="text-red-600 text-xs sm:text-sm mt-1 sm:mt-2 flex items-center">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Invalid or non-university email
              </p>
            )}
          </div>

        </motion.div>

        {/* Complaint Details Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4 sm:p-8 border border-purple-100"
        >
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900">Complaint Details</h3>
          </div>

          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1 sm:mb-2">
              Describe your complaint *
            </label>
            <textarea
              {...register("description", {
                required: "Complaint description is required",
                minLength: { value: 20, message: "Please provide more details (at least 20 characters)" },
                maxLength: { value: 2000, message: "Description too long (max 2000 characters)" },
              })}
              rows={6}
              className={`w-full px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl text-sm sm:text-lg resize-none transition-all duration-300 ${errors.description
                  ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                }`}
              placeholder="Please describe your complaint in detail. Include relevant information such as when the issue occurred, what you were trying to do, and any error messages you received. The more specific you are, the better we can help you."
            />
            {errors.description && (
              <p className="text-red-600 text-xs sm:text-sm mt-1 sm:mt-2 flex items-center">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {errors.description.message}
              </p>
            )}
            <div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
              <span>Be specific to help us route your complaint correctly</span>
              <span className="font-mono">{watch("description")?.length || 0}/2000</span>
            </div>
          </div>
        </motion.div>

        {/* File Attachments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 sm:p-8 border border-green-100"
        >
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
              <Paperclip className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900">Attachments (Optional)</h3>
          </div>

          <div
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${dragOver ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
              }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-input").click()}
          >
            <Upload className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-2 sm:mb-4" />
            <p className="text-sm sm:text-lg text-gray-600 mb-1 sm:mb-2 font-semibold">
              Click to upload or drag and drop files here
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Images, PDFs, Documents (Max 10MB each, 5 files total)
            </p>
            <input
              id="file-input"
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx,.txt"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
          </div>

          {files.length > 0 && (
            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                      <Upload className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">{file.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="p-1 sm:p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="pt-4 sm:pt-8 border-t-2 border-gray-100"
        >
          <motion.button
            type="submit"
            disabled={isSubmitting || !emailVerified}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 sm:py-6 rounded-2xl text-sm sm:text-xl font-bold shadow-2xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? (
              <Loader className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-spin mx-auto" />
            ) : (
              "Submit Complaint"
            )}
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  )
}

export default ComplaintForm
