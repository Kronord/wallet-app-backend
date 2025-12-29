const { Transaction } = require("../Models/TransactionModel");
const { User } = require("../Models/UserModel");

// Get all transactions
const getTransactions = async ({ _id }) =>
  await Transaction.find({ owner: _id });
// Post transaction
const createTransaction = async ({ data, _id }) => {
  const { balance } = await User.findById(_id);
  const {transactionType, amount} = data;
  let totalBalance = balance;
  switch (transactionType) {
    case 'Дохід':
      totalBalance += amount;
      break;
    case 'Витрата':
      totalBalance -= amount;
      break;
    default:
      break;
  };
  await User.findByIdAndUpdate(_id, {balance: totalBalance});
  Transaction.create({ ...data, owner: _id, balance: totalBalance });
};

// Delete transaction
const deleteTransaction = async (_id) => Transaction.findByIdAndDelete({ _id });

// Update transaction
const updateTransaction = async ({ data, _id, transactionId }) =>
  Transaction.findByIdAndUpdate({ _id: transactionId, owner: _id }, data, {
    new: true,
  });

module.exports = {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
};
