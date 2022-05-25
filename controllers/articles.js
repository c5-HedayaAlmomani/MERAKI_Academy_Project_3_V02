// This function returns the articles
const connection = require("../models/db");
const res = require("express/lib/response");
const getAllArticles = (req, res) => {
  const query = "SELECT * FROM articles";
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      message: "All the articles",
      articles: result,
    });
  });
};

//This function returns articles by author

const getArticlesByAuthor = (req, res) => {
  const author_id = req.query.id;
  const query = "SELECT * FROM articles WHERE author_id=?";
  const data = [author_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    }
    if (result.length) {
      res.status(201).json({
        success: true,
        message: `All the articles for the author → ${author_id}`,
        articles: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `The author => ${author_id} has no articles`,
      });
    }
  });
};

// This function returns article by its id
const getArticleById = (req, res) => {
  const id = req.query.id;
  const query = "SELECT * FROM articles WHERE id=?";
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    }
    if (result.length) {
      res.status(201).json({
        success: true,
        message: `The article with id ⇾ ${id}`,
        article: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "The article is not found",
      });
    }
  });
};

// This function creates new article
const createNewArticle = (req, res) => {
  const { title, description, author_id } = req.body;
  const query =
    "INSERT INTO articles (title ,description,author_id ) VALUES (?,?,?)";
  const data = [title, description, author_id];
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
        message: "Article created",
        result: result,
      });
    }
  });
};

// This function updates article by its id
const updateArticleById = (req, res) => {
  const id = req.params.id;
  const { title, description, author_id } = req.body;
  const query =
    "UPDATE articles SET title=? ,description=? ,author_id=? WHERE id=?";
  const data = [title, description, author_id, id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    }
    if (result.affectedRows == 1) {
      res.status(201).json({
        success: true,
        message: "Article updated",
        result: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "The article is not Found",
        result: result,
      });
    }
  });
};

// This function deletes a specific article by its id
const deleteArticleById = (req, res) => {
  const id = req.params.id;
  const query = "UPDATE articles SET is_deleted=1 WHERE id=?";
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    } else if (result.affectedRows == 1) {
      res.status(201).json({
        success: true,
        message: "Article deleted",
        result: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "The article is not Found",
        result: result,
      });
    }
  });
};

// This function deletes all the articles for a specific author
const deleteArticlesByAuthor = (req, res) => {
  const author_id = req.body.author_id;
  const query = "UPDATE articles SET is_deleted=1 WHERE author_id=?";
  const data = [author_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    } else if (!result.affectedRows) {
      res.status(404).json({
        success: false,
        message: "The article is not Found",
        result: result,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Article deleted",
        result: result,
      });
    }
  });
};

module.exports = {
  getAllArticles,
  getArticlesByAuthor,
  getArticleById,
  createNewArticle,
  updateArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
};
