"use client"
import { motion } from "framer-motion"
import { CheckCircle, Copy, ExternalLink, RotateCcw } from "lucide-react"
import toast from "react-hot-toast"
import RoleBadges from "./RoleBadges"

const SuccessPage = ({ result, onStartNew }) => {
  const copyTrackingId = () => {
    navigator.clipboard.writeText(result.trackingId)
    toast.success("Tracking ID copied to clipboard!")
  }

  const openTrackingPage = () => {
    window.open(`/track/${result.trackingId}`, "_blank")
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="text-center mb-8"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Complaint Submitted Successfully!</h1>
        <p className="text-lg text-gray-600">Your complaint has been received and processed by our AI system</p>
      </motion.div>

      {/* Tracking Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-6"
      >
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your Tracking ID</h2>
          <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl font-mono font-bold text-primary-600">{result.trackingId}</span>
              <button
                onClick={copyTrackingId}
                className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
                title="Copy tracking ID"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Save this ID to track your complaint status</p>
        </div>

        {/* Classification Results */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-1">Assigned Department</h3>
              <p className="text-blue-700">{result.classification.department}</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900 mb-1">Assigned Role</h3>
              <p className="text-green-700">{result.classification.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-medium text-orange-900 mb-1">Priority Level</h3>
              <RoleBadges urgency={result.classification.urgency} />
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-900 mb-1">AI Confidence</h3>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-purple-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${result.classification.confidence * 100}%` }}
                  />
                </div>
                <span className="text-purple-700 font-medium">
                  {Math.round(result.classification.confidence * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">What Happens Next?</h2>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-600 font-semibold text-sm">1</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Email Confirmation</h3>
              <p className="text-gray-600 text-sm">
                You'll receive a detailed confirmation email with your complaint details and tracking information.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-600 font-semibold text-sm">2</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Department Review</h3>
              <p className="text-gray-600 text-sm">
                The assigned department will review your complaint within 24-48 hours.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-purple-600 font-semibold text-sm">3</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Status Updates</h3>
              <p className="text-gray-600 text-sm">
                You'll receive email notifications as your complaint progresses through resolution.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <button
          onClick={openTrackingPage}
          className="flex-1 btn-primary py-3 flex items-center justify-center space-x-2"
        >
          <ExternalLink className="w-5 h-5" />
          <span>Track This Complaint</span>
        </button>

        <button onClick={onStartNew} className="flex-1 btn-secondary py-3 flex items-center justify-center space-x-2">
          <RotateCcw className="w-5 h-5" />
          <span>Submit Another Complaint</span>
        </button>
      </motion.div>

      {/* Important Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
      >
        <div className="flex items-start space-x-2">
          <div className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5">⚠️</div>
          <div>
            <h3 className="font-medium text-yellow-800">Important</h3>
            <p className="text-yellow-700 text-sm">
              Please save your tracking ID. You can use it to check your complaint status at any time. If you need
              immediate assistance, contact our support team directly.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default SuccessPage
