import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import App from "./App.jsx"
import "./index.css"

console.log("[v0] Starting React app initialization")

const root = ReactDOM.createRoot(document.getElementById("root"))
console.log("[v0] Root element found:", document.getElementById("root"))

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {console.log("[v0] About to render App component")}
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
)

console.log("[v0] React app render completed")
