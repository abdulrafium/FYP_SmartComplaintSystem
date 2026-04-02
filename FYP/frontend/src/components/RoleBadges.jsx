import { AlertTriangle, Clock, Zap, AlertCircle } from "lucide-react"

const RoleBadges = ({ urgency, className = "" }) => {
  const getUrgencyConfig = (level) => {
    switch (level?.toLowerCase()) {
      case "critical":
        return {
          icon: AlertTriangle,
          className: "badge-danger",
          text: "Critical",
        }
      case "high":
        return {
          icon: Zap,
          className: "badge-warning",
          text: "High",
        }
      case "medium":
        return {
          icon: Clock,
          className: "badge-primary",
          text: "Medium",
        }
      case "low":
        return {
          icon: AlertCircle,
          className: "badge-success",
          text: "Low",
        }
      default:
        return {
          icon: Clock,
          className: "badge-primary",
          text: "Medium",
        }
    }
  }

  const config = getUrgencyConfig(urgency)
  const Icon = config.icon

  return (
    <span className={`${config.className} ${className}`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.text}
    </span>
  )
}

export default RoleBadges
