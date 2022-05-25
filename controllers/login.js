// This function checks user login credentials
const jwt = require("jsonwebtoken");
const connection = require("../models/db");
const bcrypt = require("bcrypt");
const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password + "";
  const query = "SELECT * FROM users WHERE email=?";
  const data = [email];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.json(err);
    } else if (result.length == 1) {
      const hashpass = result[0].password;

      bcrypt.compare(password, hashpass, (err, result2) => {
        if (err) {
          return res.json({ err });
        } else {
          if (result2 == true) {
            const userId = result[0].id;
            const country = result[0].country;
            const role = result[0].role_id;
            const payload = { userId, country, role };
            const options = { expiresIn: "60m" };
            jwt.sign(payload, process.env.SECRET, options, (err, token) => {
              if (err) {
                res.status(500).json({
                  success: false,
                  message: `Server Error`,
                  err: err.message,
                });
              }
              res.status(200).json({
                success: true,
                message: `Valid login credentials`,
                token: token,
              });
            });
          } else {
            res.status(403).json({
              success: false,
              message: `The password you’ve entered is incorrect`,
            });
          }
        }
      });
    } else {
      res.json("the email not correct");
    }
  });
};

module.exports = {
  login,
};
