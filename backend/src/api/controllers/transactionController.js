import transactionService from "../services/transactionServices.js";

const newExpense = async (req, res) => {
  try {
    const expenseData = req.body;
    const newExpense = await transactionService.addExpense(expenseData);
    console.log("New Expense Created:", newExpense);
    res
      .status(201)
      .json({ message: "expense created successfully", data: newExpense });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const newIncome = async(req, res) => {
  try {
    const incomeData = req.body;
    const newIncome = await transactionService.addIncome(incomeData);
    console.log("New Income Created:", newIncome);
    res
      .status(201)
      .json({ message: "income created successfully", data: newIncome });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

const newRecurring = async(req, res) => {
  try {
    const recurringData = req.body;
    const newRecurring = await transactionService.addRecurring(recurringData);
    console.log("New Recurring Transaction Created:", newRecurring);
    res.status(201).json({message: "recurring transaction created successfully", data: newRecurring});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error", error: error.message});
  }
}

const getTransactionsByUserIdAndType = async (req, res) => {
  try {
    const { page = 1, limit = 10, type } = req.query;

    // get the userid from the jwt token or session
    // const userid = "8ae699bf-d8fc-48e9-915c-96daeb5a5fd6";
    const userid = "demo-account-id";

    const transactionsData = await transactionService.getTransactionsByUserIdAndType(page, limit, userid, type.toUpperCase());
    res.status(200).json(transactionsData);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

const getRecurringTransactionsByUserId = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // get the userid from the jwt token or session
    // const userid = "8ae699bf-d8fc-48e9-915c-96daeb5a5fd6";
    const userid = "demo-account-id";

    const transactionsData = await transactionService.getRecurringTransactionsByUserId(page, limit, userid);
    res.status(200).json(transactionsData);
  } catch (error) {
    console.error("Error fetching recurring transactions:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export default {
  newExpense,
  newIncome,
  newRecurring,
  getTransactionsByUserIdAndType,
  getRecurringTransactionsByUserId,
};
