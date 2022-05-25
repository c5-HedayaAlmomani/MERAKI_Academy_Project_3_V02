// This function creates new role
const connection = require("../models/db");
const createNewRole = (req, res) => {
  const role = req.body.role;
  const query = "INSERT INtO roles (role) VALUES (?)";
  const data = [role];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
      });
    }
    res.json({
      success: true,
      massage: "Success role created",
      role: result,
    });
  });
};

module.exports = { createNewRole };
