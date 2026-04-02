const Role = require("../models/Role")

const rbac = (requiredPermissions) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Authentication required" })
      }

      const role = await Role.findById(req.user.roleId)
      if (!role) {
        return res.status(403).json({ error: "Role not found" })
      }

      // Check if user has any of the required permissions
      const hasPermission = requiredPermissions.some((permission) => role.permissions.includes(permission))

      if (!hasPermission) {
        return res.status(403).json({
          error: "Insufficient permissions",
          required: requiredPermissions,
          userPermissions: role.permissions,
        })
      }

      next()
    } catch (error) {
      console.error("RBAC middleware error:", error)
      res.status(500).json({ error: "Permission check failed" })
    }
  }
}

module.exports = rbac
