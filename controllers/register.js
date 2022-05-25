// This function creates (new user)
const bcrypt = require("bcrypt");


const connection = require("../models/db");
const register = async (req, res) => {
  let { firstName, lastName, age, country, email, password, role_id } =
    req.body;
    const hasspass = await bcrypt.hash(password , 10);
    password= hasspass
  const query =
    "INSERT INTO users (firstName ,lastName,age,country,email,password,role_id) VALUES (?,?,?,?,?,?,?)";
  const data = [firstName, lastName, age, country, email, password, role_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res
        .status(409)
        .json({ success: false, message: "The email already exists" });
    }
    res.status(201).json({
      success: true,
      message: "Account Created Successfully",
      results: result,
    });
  });
};

module.exports = {
  register,
};
