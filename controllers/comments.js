// This function creates a new comment for a specific article
const connection = require("../models/db");
const createNewComment = (req, res) => {
  const { comment, commenter_id } = req.body;
  const article_id = req.params.id;
  const query =
    "INSERT INTO comments (comment ,commenter_id , article_id) VALUES (? ,?,?) ";
  const data = [comment, commenter_id, article_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "The comment has been created successfully",
        results: result,
      });
    }
  });
};

module.exports = {
  createNewComment,
};
