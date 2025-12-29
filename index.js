const express = require('express');
const app = express();
const cors = require('cors');

const authRouter = require("./Routes/authRoutes.js");
const transactionsRouter = require("./Routes/transactionRoutes.js");
const categoriesRouter = require("./Routes/categoriesRoutes.js");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use('/api/auth', authRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/categories', categoriesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  const { status = 500, message = "Internal Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = app;