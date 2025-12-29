const express = require("express");
const authMiddleware = require("../Middlewares/authMiddleware");
const getAllCategories = require("../Controllers/categoriesController");
const router = express.Router();

router.get('/', authMiddleware, getAllCategories);

module.exports = router;