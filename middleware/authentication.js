const jwt = require("jsonwebtoken");

// This function checks if the user logged in
const authentication = (req, res, next) => {
  return (req, res, next) => {
    if (!req.token.role.permissions.includes(string)) {
      return res.status(403).json({
        success: false,
        message: `Unauthorized`,
      });
    }
    next();
  };
};

module.exports = authentication;

