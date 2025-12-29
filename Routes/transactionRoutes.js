const express = require("express");
const authMiddleware = require("../Middlewares/authMiddleware");
const {
  getAll,
  create,
  update,
  deleteById,
} = require("../Controllers/transactionController");
const router = express.Router();

router.get('/', authMiddleware, getAll);

router.post('/', authMiddleware, create);

router.delete('/:transactionId', authMiddleware, deleteById);

router.put('/:transactionId', authMiddleware, update);

module.exports = router;