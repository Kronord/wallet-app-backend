const {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} = require("../Services/transactionsService");
const { createError } = require("../error");

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const transactions = await getTransactions({ _id });   
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const data = req.body;
    const newTransaction = await createTransaction({ data, _id });
    res.status(201).json(newTransaction);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const data = req.body;
    const { transactionId } = req.params;
    const updatedTransaction = await updateTransaction({
      data,
      _id,
      transactionId,
    });
    if (!updatedTransaction) {
      throw createError(404, "Not found");
    }
    res.status(200).json(updatedTransaction);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const deletedTransaction = await deleteTransaction(transactionId);
    if (!deletedTransaction) {
      throw createError(404, "Not found");
    }
    res.status(200).json(deletedTransaction);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
  update,
  deleteById,
};
