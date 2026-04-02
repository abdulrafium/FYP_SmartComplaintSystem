const axios = require("axios")

class RAGClient {
  constructor() {
    this.baseURL = process.env.AI_SERVICE_URL || "http://localhost:8000"
    this.timeout = 10000 // 10 seconds
  }

  async classifyComplaint(description) {
    try {
      const response = await axios.post(
        `${this.baseURL}/query`,
        {
          query: description,
        },
        {
          timeout: this.timeout,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      return response.data
    } catch (error) {
      console.error("RAG service error:", error.message)

      // Fallback classification logic
      return this.fallbackClassification(description)
    }
  }

  fallbackClassification(description) {
    const descLower = description.toLowerCase()

    // Simple keyword-based classification
    if (descLower.includes("cms") || descLower.includes("course") || descLower.includes("registration")) {
      return {
        departmentCode: "IT",
        roleName: "CMS Manager",
        urgency: "medium",
        confidence: 0.4,
        suggestedActions: ["Check CMS system", "Contact IT support"],
      }
    }

    if (descLower.includes("lms") || descLower.includes("learning") || descLower.includes("assignment")) {
      return {
        departmentCode: "IT",
        roleName: "LMS Manager",
        urgency: "medium",
        confidence: 0.4,
        suggestedActions: ["Check LMS system", "Contact academic support"],
      }
    }

    if (descLower.includes("wifi") || descLower.includes("internet") || descLower.includes("network")) {
      return {
        departmentCode: "IT",
        roleName: "WiFi Technician",
        urgency: "high",
        confidence: 0.4,
        suggestedActions: ["Check network connectivity", "Reset network equipment"],
      }
    }

    if (descLower.includes("fee") || descLower.includes("payment") || descLower.includes("finance")) {
      return {
        departmentCode: "FINANCE",
        roleName: "Fee Officer",
        urgency: "medium",
        confidence: 0.4,
        suggestedActions: ["Check payment records", "Contact finance department"],
      }
    }

    if (descLower.includes("library") || descLower.includes("book") || descLower.includes("research")) {
      return {
        departmentCode: "LIBRARY",
        roleName: "Librarian",
        urgency: "low",
        confidence: 0.4,
        suggestedActions: ["Check library resources", "Contact library staff"],
      }
    }

    if (descLower.includes("transport") || descLower.includes("bus") || descLower.includes("shuttle")) {
      return {
        departmentCode: "TRANSPORT",
        roleName: "Transport Manager",
        urgency: "medium",
        confidence: 0.4,
        suggestedActions: ["Check transport schedule", "Contact transport office"],
      }
    }

    // Default fallback
    return {
      departmentCode: "IT",
      roleName: "General Support",
      urgency: "medium",
      confidence: 0.2,
      suggestedActions: ["Manual review required", "Contact appropriate department"],
    }
  }

  async healthCheck() {
    try {
      const response = await axios.get(`${this.baseURL}/health`, {
        timeout: 5000,
      })
      return response.status === 200
    } catch (error) {
      return false
    }
  }
}

module.exports = new RAGClient()
